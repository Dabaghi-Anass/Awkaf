from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from django.db.models.functions import TruncDate
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework import exceptions



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
    Admins must log in using this view and not through the regular login.
    """
    def post(self, request, *args, **kwargs):
        # Get the user by username
        user = User.objects.get(username=request.data["username"])

        # Check if the user is an admin (is_staff=True)
        if not user.is_staff:
            raise PermissionDenied("Only admins can log in via this endpoint.")

        # If the user is an admin, proceed with token generation
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
