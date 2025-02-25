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
#from rest_framework.request import Request





class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_active = False  # Deactivate account until email is verified
        user.save()
        # Send email verification logic here

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

class SaveZakatHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get_dynamic_columns(self):
        """Fetch all column names in api_zakathistory except default ones."""
        with connection.cursor() as cursor:
            cursor.execute("SHOW COLUMNS FROM api_zakathistory;")
            columns = [row[0] for row in cursor.fetchall()]
        
        # Exclude predefined columns
        default_columns = {
            "id", "user_id", "liquidites", "investissements", "bien_location", 
            "creances_clients", "bien_usage_interne", "fonds_non_dispo", 
            "stocks_invendable", "stocks", "created_at", "nisab", "zakat_amount"
        }
        return [col for col in columns if col not in default_columns]

    def post(self, request):
        data = request.data.copy()
        data["user_id"] = request.user.id  # ✅ Assign authenticated user

        # Ensure valid date format
        try:
            data["created_at"] = datetime.strptime(data["created_at"], "%Y-%m-%d").date()
        except ValueError:
            return Response({"created_at": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Get dynamically added columns
        dynamic_columns = self.get_dynamic_columns()

        # ✅ Ensure only existing columns are inserted
        allowed_columns = set(dynamic_columns + [
            "user_id", "liquidites", "investissements", "bien_location", 
            "creances_clients", "bien_usage_interne", "fonds_non_dispo", 
            "stocks_invendable", "stocks", "created_at", "nisab", "zakat_amount"
        ])
        filtered_data = {k: v for k, v in data.items() if k in allowed_columns}

        # ✅ Construct the SQL query dynamically
        columns = ", ".join(filtered_data.keys())
        values = ", ".join(["%s"] * len(filtered_data))
        sql = f"INSERT INTO api_zakathistory ({columns}) VALUES ({values})"

        try:
            with connection.cursor() as cursor:
                cursor.execute(sql, list(filtered_data.values()))
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Zakat history saved successfully"}, status=status.HTTP_201_CREATED)
class AdminDeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        if not request.user.is_staff:
            raise PermissionDenied("Only admins can delete users.")
        
        user = get_object_or_404(User, id=user_id)
        
        if user.is_staff:
            return Response({"error": "You cannot delete another admin."}, status=status.HTTP_403_FORBIDDEN)
        
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
class ManageZakatHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Add a new column to the api_zakathistory table."""
        if not request.user.is_staff:
            raise PermissionDenied("Only admins can manage tables.")

        column_name = request.data.get("column_name")
        column_type = request.data.get("column_type", "VARCHAR(255)")

        if not column_name:
            return Response({"error": "Missing column_name"}, status=status.HTTP_400_BAD_REQUEST)

        query = f"ALTER TABLE api_zakathistory ADD COLUMN {column_name} {column_type};"
        with connection.cursor() as cursor:
            cursor.execute(query)

        return Response({"message": f"Column '{column_name}' added to api_zakathistory"}, status=status.HTTP_200_OK)

    def put(self, request):
        """Rename or modify an existing column in api_zakathistory."""
        if not request.user.is_staff:
            raise PermissionDenied("Only admins can manage tables.")

        old_column = request.data.get("old_column")
        new_column = request.data.get("new_column")
        new_type = request.data.get("new_type", "VARCHAR(255)")

        if not old_column or not new_column:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        query = f"ALTER TABLE api_zakathistory CHANGE {old_column} {new_column} {new_type};"
        with connection.cursor() as cursor:
            cursor.execute(query)

        return Response({"message": f"Column '{old_column}' renamed to '{new_column}' in api_zakathistory"}, status=status.HTTP_200_OK)

    def patch(self, request):
        """Rename a column or change its type in api_zakathistory."""
        if not request.user.is_staff:
            raise PermissionDenied("Only admins can manage tables.")

        old_column = request.data.get("old_column")
        new_column = request.data.get("new_column")
        new_type = request.data.get("new_type")

        if not old_column:
            return Response({"error": "Missing old_column"}, status=status.HTTP_400_BAD_REQUEST)

        if new_column and new_type:
            query = f"ALTER TABLE api_zakathistory CHANGE {old_column} {new_column} {new_type};"
            message = f"Column {old_column} renamed to {new_column} and type changed to {new_type}."
        elif new_column:
            query = f"ALTER TABLE api_zakathistory CHANGE {old_column} {new_column} VARCHAR(255);"
            message = f"Column {old_column} renamed to {new_column}."
        elif new_type:
            query = f"ALTER TABLE api_zakathistory MODIFY {old_column} {new_type};"
            message = f"Column {old_column} type changed to {new_type}."
        else:
            return Response({"error": "Missing new_column or new_type"}, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            cursor.execute(query)

        return Response({"message": message}, status=status.HTTP_200_OK)

    def delete(self, request):
        """Delete a column from the api_zakathistory table."""
        if not request.user.is_staff:
            raise PermissionDenied("Only admins can manage tables.")

        column_name = request.data.get("column_name")

        if not column_name:
            return Response({"error": "Missing column_name"}, status=status.HTTP_400_BAD_REQUEST)

        query = f"ALTER TABLE api_zakathistory DROP COLUMN {column_name};"
        with connection.cursor() as cursor:
            cursor.execute(query)

        return Response({"message": f"Column '{column_name}' deleted from api_zakathistory"}, status=status.HTTP_200_OK)
    
class WaqfProjectListCreateView(generics.ListCreateAPIView):
    queryset = WaqfProject.objects.all()
    serializer_class = WaqfProjectSerializer
    permission_classes = [IsStaffUser]  # Only staff users can add

class WaqfProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WaqfProject.objects.all()
    serializer_class = WaqfProjectSerializer
    permission_classes = [IsStaffUser]  # Only staff users can edit/delete

# New Read-Only Views for users/visitors
class WaqfProjectReadOnlyListView(generics.ListAPIView):
    queryset = WaqfProject.objects.all()
    serializer_class = WaqfProjectSerializer
    permission_classes = [AllowAny]  # Anyone can access

class WaqfProjectReadOnlyDetailView(generics.RetrieveAPIView):
    queryset = WaqfProject.objects.all()
    serializer_class = WaqfProjectSerializer
    permission_classes = [AllowAny]  # Anyone can access


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
            sender_email = data.get("email")
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
            receiver_email = "amine.dizo123@gmail.com"  # Replace with actual email

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