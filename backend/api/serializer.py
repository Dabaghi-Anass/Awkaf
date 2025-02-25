from django.contrib.auth.models import User
from rest_framework import serializers
from .models import InputField,ZakatHistory,WaqfProject,Employee
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from .models import InputField, ZakatHistory, WaqfProject


class UserSerializer(serializers.ModelSerializer):
    company = serializers.CharField(write_only=True, required=False)
    is_staff = serializers.BooleanField(write_only=True, required=False)
    is_verified = serializers.BooleanField(source='is_active', read_only=True)  # Track verification via is_active

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password", "company", "is_staff", "is_verified"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True, "allow_blank": False},  
            "is_staff": {"read_only": True},  
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        company_name = validated_data.pop('company', None)
        is_staff = validated_data.pop('is_staff', False)

    # If the user is not an admin (is_staff=False) and has no company, reject registration
        if not is_staff and not company_name:
           raise serializers.ValidationError({"company": "A company name is required for non-admin users."})

    # Create user
        user = User.objects.create_user(**validated_data)
        user.is_active = False  # Email verification required
        user.is_staff = is_staff  
        user.save()

    # Save company info in Employee model (only if provided)
        if company_name:
         Employee.objects.create(user=user, company=company_name)

        self.send_verification_email(user)  # Send email verification
 
        return user

    def update(self, instance, validated_data):
        company = validated_data.pop('company', None)
        password = validated_data.pop('password', None)
        is_staff = validated_data.pop('is_staff', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        if is_staff is not None:
            instance.is_staff = is_staff

        instance.save()
        return instance


    def send_verification_email(self, user):
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        verification_link = f"http://127.0.0.1:8000/apif/user/verify-email/{uid}/{token}/"

        send_mail(
            subject="Verify Your Email",
            message=f"Click the link to verify your email: {verification_link}",
            from_email="noreply@yourdomain.com",
            recipient_list=[user.email],
            fail_silently=False,
        )


class InputFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputField
        fields = '__all__'


class BulkUpdateInputFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputField
        fields = ["id", "label", "placeholder", "input_type", "is_required", "max_characters", "min_characters"]

    def update(self, instance, validated_data):
        """Ensure updates are applied correctly"""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)  # Apply updates
        instance.save()  # Save changes
        return instance

class BulkUpdateListSerializer(serializers.ListSerializer):
    def update(self, instances, validated_data):
        instance_mapping = {instance.id: instance for instance in instances}
        updated_instances = []

        for item in validated_data:
            instance = instance_mapping.get(item.get('id'))
            if instance:
                for attr, value in item.items():
                    setattr(instance, attr, value)
                instance.save()
                updated_instances.append(instance)

        return updated_instances
class BulkUpdateInputFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputField
        fields = ["id", "label", "placeholder", "input_type", "is_required", "max_characters", "min_characters"]
        list_serializer_class = BulkUpdateListSerializer
        # Use custom bulk update serializer
class ZakatHistorySerializer(serializers.ModelSerializer):
    created_at = serializers.DateField(format="%Y-%m-%d")
    zakat_amount = serializers.FloatField(required=False, allow_null=True)  # ✅ Not required
    nisab = serializers.FloatField(required=False, allow_null=True)  # ✅ Added nisab

    class Meta:
        model = ZakatHistory
        fields = '__all__'


class WaqfProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaqfProject
        fields = '__all__'
