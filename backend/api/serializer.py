from django.contrib.auth.models import User 
from rest_framework import serializers
from .models import Employee

class UserSerializer(serializers.ModelSerializer):
    company = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password", "company"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True, "allow_blank": False}  # Ensure email is required
        }

    def validate_email(self, value):
        """Ensure email is unique"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        company = validated_data.pop('company', None)
        user = User.objects.create_user(**validated_data)
        if company:
            Employee.objects.create(user=user, company=company)
        return user

    def update(self, instance, validated_data):
        company = validated_data.pop('company', None)
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        if company:
            Employee.objects.update_or_create(user=instance, defaults={'company': company})

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