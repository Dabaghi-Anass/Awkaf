from django.contrib.auth.models import User 
from rest_framework import serializers
from .models import Employee

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Employee

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Employee

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Employee , InputField

class UserSerializer(serializers.ModelSerializer):
    company = serializers.CharField(write_only=True, required=False)
    is_staff = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password", "company", "is_staff"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True, "allow_blank": False},  # Ensure email is required
            "is_staff": {"read_only": True},  # Prevent is_staff from being set manually
        }

    def validate_email(self, value):
        """Ensure email is unique"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        company = validated_data.pop('company', None)
        is_staff = validated_data.pop('is_staff', False)  # Default to False for regular users
        
        user = User.objects.create_user(**validated_data)
        user.is_staff = is_staff  # Set is_staff to True for admins in view, or False for regular users
        user.save()

        return user

    def update(self, instance, validated_data):
        company = validated_data.pop('company', None)
        password = validated_data.pop('password', None)
        is_staff = validated_data.pop('is_staff', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        if is_staff is not None:  # If is_staff is passed, update it
            instance.is_staff = is_staff

        instance.save()
        return instance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['user', 'company']

    def create(self, validated_data):
        user = validated_data.get('user')
        company = validated_data.get('company')
        employee = Employee.objects.create(user=user, company=company)
        return employee

class InputFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputField
        fields = '__all__'