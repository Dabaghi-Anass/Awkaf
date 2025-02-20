from django.contrib.auth.models import User
from rest_framework import serializers
from .models import InputField,ZakatHistory


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