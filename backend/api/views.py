from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializer import UserSerializer, InputFieldSerializer, BulkUpdateInputFieldSerializer,ZakatHistorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from django.db.models.functions import TruncDate
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework import exceptions
from .models import InputField,ZakatHistory
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.db import connection
from django.conf import settings
from rest_framework import generics, permissions
from .models import WaqfProject,Employee
from .serializer import WaqfProjectSerializer
from .permissions import IsStaffUser  # Custom permission
from django.core.mail import send_mail
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .models import OTPCode

from django.utils.timezone import now 
from datetime import timedelta
from rest_framework.decorators import api_view, permission_classes
#from rest_framework.request import Request
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from api.models import User
from api.serializer import UserSerializer
from api.permissions import IsStaffUser
from .models import CompanyType, CompanyField
from .serializer import CompanyTypeSerializer, CompanyFieldSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError





class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Public registration

    def perform_create(self, serializer):
        print("Incoming Data:", self.request.data)  # 🔥 Debug incoming data
        user = serializer.save()
        user.is_active = False
        user.save()
class UserLoginRequestOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # First, check if the user exists
        user = User.objects.filter(username=username).first()
        
        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user's email is verified (active account)
        if not user.is_active:
            return Response({"error": "Email not verified. Please verify your email."}, status=status.HTTP_403_FORBIDDEN)

        # Authenticate after checking if the user is active
        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

        # Send OTP email
        send_otp_email(user)
        return Response({"message": "OTP sent to your email. Enter OTP to proceed."})

class UserVerifyOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        otp = request.data.get("otp")

        # Check if user exists
        user = User.objects.filter(username=username).first()
        if not user:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if OTP exists for the user
        otp_obj = OTPCode.objects.filter(user=user).first()
        if not otp_obj:
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if OTP is expired
        if (now() - otp_obj.created_at) > timedelta(minutes=5):
            otp_obj.delete()  # Delete expired OTP
            return Response({"error": "OTP has expired. Request a new one."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if OTP matches
        if otp_obj.otp != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        # Activate user and delete OTP
        user.is_active = True
        user.save()
        otp_obj.delete()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
        })

class AdminRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        data["is_staff"] = True  # Ensure only admin accounts are created

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False  # Require verification before activation
            user.save()
            
            send_otp_email(user)  # Send OTP for admin verification
            return Response({"message": "Admin account created. Verify email with OTP."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class AdminLoginRequestOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        secret_key = request.data.get("secret_key")

        # First, check if the user exists
        user = User.objects.filter(username=username).first()
        
        if not user or not user.is_staff:
            return Response({"error": "Invalid admin credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user's email is verified (active account)
        if not user.is_active:
            return Response({"error": "User is not verified. Please verify your email first."}, status=status.HTTP_403_FORBIDDEN)

        # Authenticate after checking if the user is active
        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

        # Verify the secret key
        if secret_key != settings.ADMIN_SECRET_KEY:
            return Response({"error": "Invalid secret key"}, status=status.HTTP_403_FORBIDDEN)

        send_otp_email(user)  # Send OTP email
        return Response({"message": "OTP sent to your email. Enter OTP to proceed."})
class AdminVerifyOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        otp = request.data.get("otp")

        # Check if admin exists
        user = User.objects.filter(username=username, is_staff=True).first()
        if not user:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if OTP exists for the admin
        otp_obj = OTPCode.objects.filter(user=user).first()
        if not otp_obj:
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if OTP is expired
        if (now() - otp_obj.created_at) > timedelta(minutes=5):
            otp_obj.delete()  # Delete expired OTP
            return Response({"error": "OTP has expired. Request a new one."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if OTP matches
        if otp_obj.otp != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        # Activate admin and delete OTP
        user.is_active = True
        user.save()
        otp_obj.delete()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
        })
        
class UpdateDeleteUserView(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users

    def get_object(self, request):
        """Get the logged-in user's object"""
        return request.user

    def put(self, request, *args, **kwargs):
        """Full update of user profile"""
        return self.update_user(request, partial=False)

    def patch(self, request, *args, **kwargs):
        """Partial update of user profile"""
        return self.update_user(request, partial=True)

    def update_user(self, request, partial):
        """Handles both PUT and PATCH updates"""
        user = self.get_object(request)
        serializer = UserSerializer(user, data=request.data, partial=partial)

        if serializer.is_valid():
            serializer.save()

            # Update company if the user has one
            if hasattr(user, "employee") and "company" in request.data:
                user.employee.company = request.data["company"]
                user.employee.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, *args, **kwargs):
        """Allow users to delete their own account"""
        user = self.get_object(request)

        # Delete Employee record if it exists
        Employee.objects.filter(user=user).delete()

        user.delete()
        return Response({"message": "Account deleted successfully."}, status=204)



class AdminRegisterView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated users to register

    def post(self, request):
        # Get data from the request
        data = request.data

        # Explicitly set is_staff to True for admin creation
        data["is_staff"] = True  # Always make is_staff True for admins

        # Use the UserSerializer to validate and create the admin user
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()  # Admin user is created with is_staff=True
            return Response({"message": "Admin user created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminLoginView(TokenObtainPairView):
    """
    Admin login view that uses JWT to authenticate admins.
    Admins must provide a secret key along with their credentials.
    """

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        secret_key = request.data.get("secret_key")  # Get secret key from frontend

        try:
            user = User.objects.get(username=username)

            # Check if the user is an admin
            if not user.is_staff:
                raise PermissionDenied("Only admins can log in via this endpoint.")

            # Verify the secret key
            if secret_key != settings.ADMIN_SECRET_KEY:
                return Response({"error": "Invalid secret key"}, status=status.HTTP_403_FORBIDDEN)

        except User.DoesNotExist:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)

        # Proceed with JWT token generation
        return super().post(request, *args, **kwargs)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        user = User.objects.filter(username=username).first()
        
        if user and not user.is_active:
            return Response({"error": "Email not verified. Please verify your email before logging in."}, status=status.HTTP_403_FORBIDDEN)
        
        return super().post(request, *args, **kwargs)



class InputFieldListCreate(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def post(self, request):
        # Check if the request data is a single object (dict) or a list
        if isinstance(request.data, dict):
            serializer = InputFieldSerializer(data=request.data)  # Single object creation
        elif isinstance(request.data, list):
            serializer = InputFieldSerializer(data=request.data, many=True)  # Bulk creation
        else:
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()  # ✅ Ensure many=True serializer is saved properly
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BulkInputFieldUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        """Handles full updates (replacing all fields)."""
        return self.update_fields(request, partial=False)

    def patch(self, request):
        """Handles partial updates (modifying only specified fields)."""
        return self.update_fields(request, partial=True)

    def update_fields(self, request, partial):
        data = request.data

        # Convert single update request into a list
        if isinstance(data, dict):
            data = [data]

        instance_ids = [item.get("id") for item in data if "id" in item]
        if not instance_ids:
            return Response({"error": "No valid IDs provided for update"}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch instances from the database
        instances = {instance.id: instance for instance in InputField.objects.filter(id__in=instance_ids)}

        if len(instances) != len(instance_ids):
            return Response({"error": "Some IDs do not exist in the database"}, status=status.HTTP_400_BAD_REQUEST)

        updated_instances = []
        errors = {}

        # Apply updates manually
        for item in data:
            instance = instances.get(item["id"])
            serializer = BulkUpdateInputFieldSerializer(instance, data=item, partial=partial)

            if serializer.is_valid():
                updated_instance = serializer.save()
                updated_instances.append(updated_instance)
            else:
                errors[item["id"]] = serializer.errors

        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize the updated instances
        serialized_data = BulkUpdateInputFieldSerializer(updated_instances, many=True).data

        return Response({"message": "Successfully updated", "data": serialized_data}, status=status.HTTP_200_OK)



class BulkInputFieldDelete(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def delete(self, request):
        data = request.data

        # Handle single delete (convert single ID to list)
        if isinstance(data, dict) and "id" in data:
            data = {"ids": [data["id"]]}

        instance_ids = data.get('ids', [])

        if not instance_ids:
            return Response({"error": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the requested IDs exist
        deleted_count, _ = InputField.objects.filter(id__in=instance_ids).delete()

        if deleted_count == 0:
            return Response({"error": "No valid IDs found"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "InputFields deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
from django.db import connection


class AdminDeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        if not request.user.is_staff:
            raise PermissionDenied("Only admins can delete users.")
        
        user = get_object_or_404(User, id=user_id)
        
        if user.is_staff:
            return Response({"error": "You cannot delete another admin."}, status=status.HTTP_403_FORBIDDEN)
        
        user.delete()

        # ✅ Clear the cached non-staff users list after deletion
        cache.delete("non_staff_users_list")

        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    
class WaqfProjectListCreateView(generics.ListCreateAPIView):
    queryset = WaqfProject.objects.all().order_by('-created_at')  # Order by newest first
    serializer_class = WaqfProjectSerializer
    permission_classes = [IsStaffUser]  # Only staff users can add

# Retrieve, Update & Delete View (Only Staff Users can modify)
class WaqfProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WaqfProject.objects.all()
    serializer_class = WaqfProjectSerializer
    permission_classes = [IsStaffUser]  # Only staff users can edit/delete

# Read-Only List View (Anyone can access)
class WaqfProjectReadOnlyListView(generics.ListAPIView):
    queryset = WaqfProject.objects.all().order_by('-created_at')  # Order by newest first
    serializer_class = WaqfProjectSerializer
    permission_classes = [AllowAny]  # Public access

# Read-Only Detail View (Anyone can access)
class WaqfProjectReadOnlyDetailView(generics.RetrieveAPIView):
    queryset = WaqfProject.objects.all()
    serializer_class = WaqfProjectSerializer
    permission_classes = [AllowAny]  # Public access



from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # Bypass CSRF protection for testing
def send_contact_email(request):
    if request.method == "POST":
        try:
            # Decode the JSON body
            data = json.loads(request.body.decode("utf-8"))

            first_name = data.get("first_name")
            last_name = data.get("last_name")
            sender_email = data.get("sender_email")
            phone = data.get("phone")
            message = data.get("message")

            # Debugging: Print values to check if they are received
            print("Received Data:")
            print(f"First Name: {first_name}")
            print(f"Last Name: {last_name}")
            print(f"Email: {sender_email}")
            print(f"Phone: {phone}")
            print(f"Message: {message}")

            if not all([first_name, last_name, sender_email, message]):
                return JsonResponse({"error": "All fields are required"}, status=400)

            subject = f"New Message from {first_name} {last_name}"
            full_message = f"""
            First Name: {first_name}
            Last Name: {last_name}
            Email: {sender_email}
            Phone: {phone}

            Message:
            {message}
            """
            receiver_email = "aminecheikh180@gmail.com"  # Replace with actual email

            send_mail(subject, full_message, sender_email, [receiver_email])

            return JsonResponse({"success": "Email sent successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]  # ✅ Make sure anyone can access this

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return JsonResponse({"message": "Email verified successfully!"})
            else:
                return JsonResponse({"error": "Invalid or expired token."}, status=400)

        except (User.DoesNotExist, ValueError, TypeError):
            return JsonResponse({"error": "Invalid verification link."}, status=400)
class RequestPasswordResetView(APIView):
    permission_classes = [AllowAny]  # ✅ Publicly accessible

    def post(self, request):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"http://127.0.0.1:8000/apif/user/reset-password/{uid}/{token}/"

            # ✅ Send Email
            send_mail(
                subject="Password Reset Request",
                message=f"Click the link to reset your password: {reset_link}",
                from_email="noreply@yourdomain.com",
                recipient_list=[email],
                fail_silently=False,
            )
            return Response({"message": "Password reset email sent!"})

        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)
class ResetPasswordView(APIView):
    permission_classes = [AllowAny]  # ✅ Allow all users to access this endpoint (no auth required)

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

            new_password = request.data.get("password")
            if not new_password:
                return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            # ✅ Send email notification
            send_mail(
                subject="Password Changed Successfully",
                message="Your password has been changed successfully. If you did not request this change, please contact support immediately.",
                from_email="noreply@yourdomain.com",
                recipient_list=[user.email],
                fail_silently=False,
            )

            return Response({"message": "Password reset successful. A confirmation email has been sent."}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # ✅ Blacklist the token

            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ✅ Custom Pagination Class

class ArrayPagination(PageNumberPagination):
    """ ✅ Returns only the list of users instead of an object """
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50

    def get_paginated_response(self, data):
        return Response(data)  # ✅ Only return the array (not an object)

# ✅ Admin Non-Staff User List View
class AdminNonStaffUserListView(generics.ListAPIView):
    """ ✅ Allows only staff users to see non-staff users with optional pagination """

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None  # Default: No pagination
    CACHE_KEY = "non_staff_users_list"

    def get_queryset(self):
        """ ✅ Fetch non-staff users """
        return User.objects.filter(is_staff=False).only("id", "username", "email", "date_joined")

    def list(self, request, *args, **kwargs):
        """ ✅ Return paginated or full user list based on request """
        queryset = self.get_queryset()

        # ✅ Serialize data and format `date_joined`
        serializer = self.get_serializer(queryset, many=True)
        serialized_data = serializer.data
        for user in serialized_data:
            user["date_joined"] = user["date_joined"].strftime("%Y-%m-%d")  # Format date properly

        # ✅ Apply pagination if requested
        if "page" in request.GET and "page_size" in request.GET:
            paginator = ArrayPagination()
            paginated_data = paginator.paginate_queryset(serialized_data, request, view=self)
            return paginator.get_paginated_response(paginated_data)

        # ✅ Default: Return all users (no pagination)
        return Response(serialized_data)

    
def send_otp_email(user):
    otp = str(random.randint(100000, 999999))  # Generate a 6-digit OTP

    # Try to update existing OTP or create a new one
    otp_obj, created = OTPCode.objects.update_or_create(
        user=user, defaults={"otp": otp, "created_at": now()}
    )

    # 🔥 Debugging: Print to console/logs
    print(f"OTP for {user.username}: {otp}, Stored: {created}")

    # Check if OTP was successfully saved
    saved_otp = OTPCode.objects.filter(user=user).first()
    if not saved_otp:
        print("❌ ERROR: OTP not saved in the database!")

    # Send OTP email
    send_mail(
        subject="Your OTP Code",
        message=f"Your OTP code is {otp}. It expires in 10 minutes.",
        from_email="your@email.com",  # Change this to your sender email
        recipient_list=[user.email],
        fail_silently=False,
    )
def verify_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        otp = data.get("otp")

        user = User.objects.filter(username=username).first()
        otp_obj = OTPCode.objects.filter(user=user).first()

        if not user or not otp_obj:
            return JsonResponse({"error": "Invalid username or OTP"}, status=400)

        if otp_obj.otp == otp:
            otp_obj.delete()  # Delete OTP after successful verification

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return JsonResponse({
                "access_token": access_token,
                "refresh_token": str(refresh),
            })

        return JsonResponse({"error": "Invalid or expired OTP"}, status=400)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
def create_table(request):
    user = request.user
    if not user.is_staff:  # Only admins can create tables
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    data = request.data
    type_value = data.get('type', '').strip()  # Get 'type' value and remove extra spaces
    attributes = data.get('attributes', [])

    if not type_value or not attributes:
        return JsonResponse({'error': 'Invalid data'}, status=400)

    table_name = f"type de {type_value}"  # Format the table name with spaces
    table_name = f"`{table_name}`"  # Wrap it in backticks for MySQL compatibility

    # Prevent 'id' from being passed in attributes
    for attr in attributes:
        if attr['name'].lower() == 'id':
            return JsonResponse({'error': "You cannot define 'id' as a custom attribute."}, status=400)

    # Build SQL query for table creation
    columns_sql = ", ".join([f"`{attr['name']}` {attr['type']}" for attr in attributes])
    sql_query = f"CREATE TABLE {table_name} (`id` INT AUTO_INCREMENT PRIMARY KEY, {columns_sql});"

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
        return JsonResponse({'message': f'Table {table_name} created successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Require authentication
def get_table_data(request, table_name):
    user = request.user
    if not user.is_staff:  # Check if the user is an admin
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    table_name = f"type de {table_name}"  # Format the table name
    table_name = f"`{table_name}`"  # Wrap in backticks for MySQL compatibility

    try:
        with connection.cursor() as cursor:
            cursor.execute(f"SELECT * FROM {table_name};")
            columns = [col[0] for col in cursor.description]  # Get column names
            rows = cursor.fetchall()  # Fetch all rows

        data = [dict(zip(columns, row)) for row in rows]
        return JsonResponse({'table_name': table_name, 'data': data})
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rename_table(request):
    user = request.user
    if not user.is_staff:  
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    data = request.data
    old_name = f"type de {data.get('old_name', '').strip()}"
    new_name = f"type de {data.get('new_name', '').strip()}"

    try:
        with connection.cursor() as cursor:
            cursor.execute(f"ALTER TABLE `{old_name}` RENAME TO `{new_name}`;")
        return JsonResponse({'message': f'Table renamed to {new_name} successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)








@api_view(['POST'])
@permission_classes([IsAuthenticated])
def modify_table(request):
    user = request.user
    if not user.is_staff:
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    data = request.data
    table_name = f"type de {data.get('table_name', '').strip()}"
    add_columns = data.get('add_columns', [])
    remove_columns = data.get('remove_columns', [])

    # 🚨 Prevent deletion of the 'id' column
    if "id" in remove_columns:
        return JsonResponse({'error': "Cannot delete primary key column 'id'."}, status=400)

    alter_queries = []

    # Adding new columns
    for col in add_columns:
        alter_queries.append(f"ADD COLUMN `{col['name']}` {col['type']}")

    # Removing columns (excluding 'id')
    for col in remove_columns:
        alter_queries.append(f"DROP COLUMN `{col}`")

    if not alter_queries:
        return JsonResponse({'error': 'No modifications specified'}, status=400)

    alter_sql = f"ALTER TABLE `{table_name}` " + ", ".join(alter_queries) + ";"

    try:
        with connection.cursor() as cursor:
            cursor.execute(alter_sql)
        return JsonResponse({'message': f'Table {table_name} modified successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    
    
    
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_table(request, table_name):
    user = request.user
    if not user.is_staff:  
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    full_table_name = f"type de {table_name}"

    try:
        with connection.cursor() as cursor:
            cursor.execute(f"DROP TABLE `{full_table_name}`;")
        return JsonResponse({'message': f'Table {full_table_name} deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
class WaqfProjectListView(generics.ListAPIView):
    """ ✅ Returns all Waqf projects (paginated or full list) as an array """

    serializer_class = WaqfProjectSerializer
    permission_classes = [AllowAny]  # ✅ Anyone can access
    pagination_class = None  # ✅ Default: No pagination

    def get_queryset(self):
        """ ✅ Fetch all Waqf projects """
        return WaqfProject.objects.all().only(
            "id", "name", "domain", "objectives", "partners", "image", "created_at", "updated_at"
        )

    def list(self, request, *args, **kwargs):
        """ ✅ Return paginated or full list based on request """
        queryset = self.get_queryset()

        # ✅ Serialize data and format dates
        serializer = self.get_serializer(queryset, many=True)
        serialized_data = serializer.data
        for project in serialized_data:
            project["created_at"] = project["created_at"].split("T")[0]  # ✅ Keep only YYYY-MM-DD
            project["updated_at"] = project["updated_at"].split("T")[0]  # ✅ Keep only YYYY-MM-DD

        # ✅ Apply pagination if requested
        if "page" in request.GET and "page_size" in request.GET:
            paginator = ArrayPagination()
            paginated_data = paginator.paginate_queryset(serialized_data, request, view=self)
            return paginator.get_paginated_response(paginated_data)

        # ✅ Default: Return all projects (no pagination)
        return Response(serialized_data)


from django.shortcuts import get_object_or_404
from sympy import sympify, symbols # type: ignore
from .models import CompanyType, CompanyField

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from .models import CompanyType, CompanyField
from .serializer import CompanyTypeSerializer, CompanyFieldSerializer

import json
import re
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError
from sympy import symbols, sympify
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CompanyType, CompanyField

@api_view(['POST'])
@api_view(['POST'])
@api_view(['POST'])

def normalize_formula(formula, fields):
    """
    Normalize field names inside the formula by replacing spaces with underscores, 
    even if they are inside parentheses.
    """
    for field in sorted(fields, key=len, reverse=True):  # Sort by length to avoid partial replacements
        safe_field = field.strip().replace(" ", "_")  # Ensure spaces are replaced
        formula = re.sub(rf'\b{re.escape(field)}\b', safe_field, formula)
    
    return formula
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import re

@api_view(['POST'])
def create_company_with_fields(request):
    """
    Create a company type and its fields in a single request while avoiding duplicates.
    """
    try:
        # ✅ Ensure request data is correctly parsed
        if hasattr(request, 'data'):  # DRF request
            data = request.data
        else:  # Fallback for raw JSON request
            data = json.loads(request.body.decode('utf-8'))

        name = data.get('name')
        calculation_method = data.get('calculation_method')
        fields_data = data.get('fields', [])

        if not name or not calculation_method:
            return Response({"error": "Name and calculation method are required"}, status=400)

        if not fields_data:
            return Response({"error": "At least one field is required"}, status=400)

        # ✅ Normalize field names
        normalized_fields = {field.strip().replace(" ", "_") for field in fields_data}

        # ✅ Normalize field names inside the formula
        def normalize_formula(formula, fields):
            for field in sorted(fields, key=len, reverse=True):
                safe_field = field.strip().replace(" ", "_")
                formula = re.sub(rf'\b{re.escape(field)}\b', safe_field, formula)
            return formula

        calculation_method = normalize_formula(calculation_method, fields_data)

        # ✅ Check if company type already exists
        company_type, created = CompanyType.objects.get_or_create(
            name=name,
            defaults={"calculation_method": calculation_method}
        )

        if not created:
            return Response({"error": "A company with this name already exists."}, status=400)

        # ✅ Check for existing fields
        existing_fields = {field.name for field in company_type.fields.all()}
        new_fields = [CompanyField(company_type=company_type, name=field_name)
                      for field_name in normalized_fields if field_name not in existing_fields]

        if new_fields:
            CompanyField.objects.bulk_create(new_fields)  # Optimized bulk insert

        return Response({"message": "Company created successfully!"}, status=201)

    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON format"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def calculate_zakat(request):
    """
    Calculate Zakat based on company type, user inputs, a multiplier 'moon', and a threshold 'nissab'.
    """
    try:
        data = json.loads(request.body.decode('utf-8'))

        company_type_id = data.get('company_type_id')
        user_inputs = data.get('user_inputs', {})
        moon = float(data.get('moon', 1))
        nissab = float(data.get('nissab', 0))

        if not company_type_id or not isinstance(user_inputs, dict):
            return JsonResponse({'error': 'Invalid data'}, status=400)

        zakat_base, zakat_result = calculate_zakat_logic(company_type_id, user_inputs, moon, nissab)
        return JsonResponse({"zakat_base": zakat_base, "zakat_result": zakat_result}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)

def calculate_zakat_logic(company_type_id, user_inputs, moon, nissab):
    """
    Securely calculate Zakat based on company type, user inputs, 'moon' multiplier, and 'nissab' threshold.
    """
    company_type = get_object_or_404(CompanyType, id=company_type_id)
    fields = CompanyField.objects.filter(company_type=company_type)

    # ✅ Normalize user input field names
    user_inputs = {key.strip().replace(" ", "_"): value for key, value in user_inputs.items()}

    required_fields = {field.name for field in fields}
    missing_fields = required_fields - user_inputs.keys()

    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

    formula = company_type.calculation_method

    try:
        # ✅ Normalize formula to ensure all fields match
        formula_symbols = {name: symbols(name) for name in required_fields}
        expression = sympify(formula, locals=formula_symbols)
        zakat_base = expression.evalf(subs=user_inputs)

        zakat_base = round(float(zakat_base), 2)

        # ✅ Calculate Zakat Result
        zakat_result = zakat_base * moon if zakat_base > nissab else 0

        return zakat_base, zakat_result

    except Exception as e:
        raise ValueError(f"Error evaluating formula: {e}")
from django.db import IntegrityError
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CompanyType

@api_view(['DELETE'])
def delete_company(request, company_type_id):
    """
    Delete a company type and all its related fields.
    """
    try:
        company_type = CompanyType.objects.get(id=company_type_id)
    except CompanyType.DoesNotExist:
        return Response({"error": f"Company Type with ID {company_type_id} not found"}, status=status.HTTP_404_NOT_FOUND)

    # Delete the company type (cascades to related fields)
    company_type.delete()
    
    # ✅ Ensure a valid DRF Response
    return Response({"message": f"Company Type {company_type_id} deleted successfully"}, status=status.HTTP_200_OK)

@api_view(['PUT', 'PATCH'])
def update_company_with_fields(request, company_type_id):
    """
    Update a company type and its related fields.
    - PUT: Full replace (deletes old fields and adds new ones)
    - PATCH: Modify only provided fields (replace names if needed)
    """
    company_type = get_object_or_404(CompanyType, id=company_type_id)
    
    # Extract request data
    data = request.data
    fields_data = data.pop('fields', None)  # Extract fields if provided

    # Update company type details
    serializer = CompanyTypeSerializer(company_type, data=data, partial=(request.method == "PATCH"))
    
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle fields update
    if fields_data is not None:
        if request.method == "PUT":
            # PUT: Remove all fields and add new ones
            company_type.fields.all().delete()
        
        for field_data in fields_data:
            field_name = field_data.get("name")
            if not field_name:
                continue  # Skip invalid fields
            
            existing_field = company_type.fields.filter(name=field_name).first()
            
            if request.method == "PATCH":
                if existing_field:
                    # PATCH: Rename existing field instead of adding duplicate
                    existing_field.name = field_name
                    existing_field.save()
                else:
                    # PATCH: Add new field if it does not exist
                    CompanyField.objects.create(company_type=company_type, **field_data)
            else:
                # PUT: Just add new fields (all old ones were deleted)
                CompanyField.objects.create(company_type=company_type, **field_data)

    return Response(serializer.data, status=status.HTTP_200_OK)

from .serializer import CompanyTypeSimpleSerializer

@api_view(['GET'])
def get_company_type_fields(request, company_type_id):
    """
    Get only the name and fields of a CompanyType
    """
    company_type = get_object_or_404(CompanyType, id=company_type_id)
    serializer = CompanyTypeSimpleSerializer(company_type)
    return Response(serializer.data)

@api_view(['GET'])
def list_all_company_types(request):
    """
    Get all company types with their IDs, names, and fields
    """
    all_companies = CompanyType.objects.all()
    serializer = CompanyTypeSimpleSerializer(all_companies, many=True)
    return Response(serializer.data)

from .models import ZakatHistory
from .serializer import ZakatHistorySerializer

@api_view(['POST'])
def zakat_history(request):
    """
    Save zakat calculations in the database with only the date (YYYY-MM-DD).
    """
    data = request.data

    zakat_base = data.get('zakat_base')
    zakat_result = data.get('zakat_result')
    month_type = data.get('month_type')
    nissab = data.get('nissab')

    if zakat_base is None or zakat_result is None or month_type is None or nissab is None:
        return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Save in database with only the date (YYYY-MM-DD)
    zakat_record = ZakatHistory.objects.create(
        zakat_base=zakat_base,
        zakat_result=zakat_result,
        month_type=month_type,
        calculation_date=now().date(),  # ✅ Stores only YYYY-MM-DD
        nissab=nissab
    )

    serializer = ZakatHistorySerializer(zakat_record)
    return Response(serializer.data, status=status.HTTP_201_CREATED)