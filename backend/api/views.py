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


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserUpdateView(generics.UpdateAPIView):
    """
    View for the currently logged-in user to update their own information.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the currently authenticated user
        return self.request.user
    def perform_update(self, serializer):
        # Check if the password is being updated
        password = serializer.validated_data.get('password', None)
        if password:
            # Hash the password before saving
            self.request.user.set_password(password)
            # Remove password from the validated data to avoid re-setting as plain text
            serializer.validated_data.pop('password', None)
        serializer.save()
    def get(self, request, *args, **kwargs):
        # Serialize the currently authenticated user's data
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)
    
class UserDeleteView(generics.DestroyAPIView):
    """
    View for the currently logged-in user to delete their own account.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the currently authenticated user
        return self.request.user