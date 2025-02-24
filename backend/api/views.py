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
from .models import WaqfProject
from .serializer import WaqfProjectSerializer
from .permissions import IsStaffUser  # Custom permission
from django.core.mail import send_mail
from django.http import JsonResponse


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        password = serializer.validated_data.get('password', None)
        if password:
            self.request.user.set_password(password)
            serializer.validated_data.pop('password', None)
        serializer.save()

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class UserDeleteView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


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
        # Retrieve user by username
        user = User.objects.get(username=request.data["username"])

        # Check if the user is an admin (is_staff=True)
        if user.is_staff:
            # If the user is an admin, prevent login through the regular user endpoint
            raise PermissionDenied("Admins cannot log in through the regular user login endpoint. Please use the admin login endpoint.")

        # Proceed with normal JWT token creation for regular users
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
    
class SaveZakatHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        required_fields = [
            "liquidites", "investissements", "bien_location", 
            "creances_clients", "bien_usage_interne", 
            "fonds_non_dispo", "stocks_invendable", "stocks", 
            "created_at", "nisab"  # ✅ Ensuring nisab is required
        ]

        # Ensure all required fields exist
        missing_fields = [field for field in required_fields if field not in request.data]
        if missing_fields:
            return Response({field: "This field is required." for field in missing_fields}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data["user"] = request.user.id  

        # Ensure valid date format
        try:
            data["created_at"] = datetime.strptime(data["created_at"], "%Y-%m-%d").date()  
        except ValueError:
            return Response({"created_at": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure zakat_amount is optional
        if "zakat_amount" not in data:
            data["zakat_amount"] = None  # ✅ Defaults to None

        serializer = ZakatHistorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
            receiver_email = "aminecheikh17@gmail.com"  # Replace with actual email

            send_mail(subject, full_message, sender_email, [receiver_email])

            return JsonResponse({"success": "Email sent successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)