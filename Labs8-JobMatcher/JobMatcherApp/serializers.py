from django.db import transaction
from oauth2_provider.oauth2_backends import OAuthLibCore
from oauth2_provider.oauth2_validators import OAuth2Validator
from oauthlib.common import Request
from oauthlib.oauth2 import BearerToken
from rest_framework import serializers

from .models import User, Seeker, Employer


class UserSerializer(serializers.ModelSerializer):
    """ModelSerializer to create auth users."""

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'is_staff', 'is_seeker', 'is_employer']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True},
        }

    def create(self, validated_data):
        """Creates new auth user object using UserManager."""
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        # Pop out the password and give it a default value of none if it doesnt exist
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)  # Sets the hash
        return super().update(instance, validated_data)


class ProfileSerializer(serializers.Serializer):
    """
    Serializer to be subclassed by Seeker and Employer serializers.

    It allows creating and updating profiles and their related users.
    """

    email = serializers.EmailField(source='user.email', max_length=255)
    password = serializers.CharField(source='user.password', max_length=128, write_only=True)
    old_password = serializers.CharField(max_length=128, write_only=True, required=False)
    first_name = serializers.CharField(source='user.first_name', allow_blank=True, max_length=30, required=False)
    last_name = serializers.CharField(source='user.last_name', allow_blank=True, max_length=150, required=False)
    is_seeker = serializers.ReadOnlyField(source='user.is_seeker')
    is_employer = serializers.ReadOnlyField(source='user.is_employer')


    class Meta:
        fields = ['email', 'password', 'old_password', 'first_name', 'last_name', 'is_seeker', 'is_employer', 'photo',
                  'summary', 'credits', 'confirm_spending']

    def validate_email(self, email):
        """Make sure the given email is not taken by someone else"""
        queryset = User.objects.all()

        # When updating, exclude the profile.user from the validation as it obviously has the same email
        if self.instance is not None:
            queryset = queryset.exclude(id=self.instance.user_id)

        if queryset.filter(email__iexact=email).exists():
            raise serializers.ValidationError('This email has been taken by someone else.')

        return email

    @transaction.atomic
    def update(self, instance, validated_data):
        """
        Updates existing Profile (Seeker or Employer) and the auth User model.
        """
        # Update auth user model first.
        # Since we have `validated_user_data`, we don't need to validate it again and rather directly use .update()
        validated_user_data = validated_data.pop('user', {})
        UserSerializer().update(instance=instance.user, validated_data=validated_user_data)
        # Update profile by calling super as ModelSerializer handles updating its instance (Seeker or Employer)
        return super().update(instance, validated_data)

    def validate_old_password(self, old_password):
        if not self.context['request'].user.check_password(old_password):
            raise serializers.ValidationError('Your old password is not correct')
        return old_password


class SignupMixin(serializers.Serializer):
    """Returns Oauth2 access and refresh tokens in addition to the profile fields under 'profile' key"""
    client_id = serializers.CharField()
    client_secret = serializers.CharField()

    def to_representation(self, instance):
        core = OAuthLibCore()
        uri, http_method, body, headers = core._extract_params(self.context['request'])
        headers = {
            **headers,
            'client_id': self.initial_data['client_id'],
            'client_secret': self.initial_data['client_secret'],
        }
        request = Request(uri=uri, http_method=http_method, body=body, headers=headers)
        request.scopes = ['read', 'write']
        request.user = instance.user
        validator = OAuth2Validator()
        validator.authenticate_client(request)
        token = BearerToken(request_validator=validator).create_token(request, refresh_token=True, save_token=True)
        return {
            **token,
            'profile': super().to_representation(instance)
        }

    def validate(self, attrs):
        if 'client_id' not in self.initial_data:
            raise serializers.ValidationError({'client_id': ['This field is required']})
        if 'client_secret' not in self.initial_data:
            raise serializers.ValidationError({'client_secret': ['This field is required']})
        return attrs


class SeekerSerializer(ProfileSerializer, serializers.ModelSerializer):
    """Default representation for Seeker objects"""

    class Meta:
        model = Seeker
        fields = ['id', *ProfileSerializer.Meta.fields, 'desired_title', 'top_skills', 'extra_skills', 'other_skills',
                  'free_apps', 'education', 'experience']

    @transaction.atomic  # Ensure creation of both models is done in a single transaction not to create inconsistencies
    def create(self, validated_data):
        """
        Creates new User and Seeker profile.
        """
        # Create auth user model first
        validated_user_data = validated_data.pop('user', {})
        user = User.objects.create_user(is_seeker=True, **validated_user_data)
        # Create Seeker profile
        return Seeker.objects.create(user=user, **validated_data)


class SignupSeekerSerializer(SignupMixin, SeekerSerializer):
    """Serializer to be used for representing Seeker after signup."""
    pass


class EmployerSerializer(ProfileSerializer, serializers.ModelSerializer):
    """Default representation for Employer objects"""

    class Meta:
        model = Employer
        fields = ['id', *ProfileSerializer.Meta.fields, 'company_name', 'free_calls', 'postings']

    @transaction.atomic
    def create(self, validated_data):
        """
        Creates new User and Employer profile.
        """
        # Create auth user model first
        validated_user_data = validated_data.pop('user', {})
        user = User.objects.create_user(is_employer=True, **validated_user_data)
        # Create Employer profile
        return Employer.objects.create(user=user, **validated_data)


class SignupEmployerSerializer(SignupMixin, EmployerSerializer):
    """Serializer to be used for representing Employer after signup."""
    pass
