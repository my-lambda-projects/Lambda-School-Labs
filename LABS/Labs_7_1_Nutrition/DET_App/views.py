from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db.utils import IntegrityError
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import status
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions, generics

from .api import TokenSerializer, UserSerializer


import requests

# Create your views here.

# Get the JWT settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class LoginView(generics.CreateAPIView):
    """
    POST auth/login/
    """

    # This permission class will over ride the global permission
    # class setting
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # login saves the user’s ID in the session,
            # using Django’s session framework.
            login(request, user)
            serializer = TokenSerializer(data={
                # using drf jwt utility functions to generate a token
                "token": jwt_encode_handler(
                    jwt_payload_handler(user)
                )})
            serializer.is_valid()
            return Response(serializer.data)

        return Response(
                data={
                    "message": "You are not registered with this username and password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )


class RegisterUsers(generics.CreateAPIView):
    """
    POST auth/register/
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        email = request.data.get("email", "")
        if not username or not password or not email:
            return Response(
                data={
                    "message": "Username, Password and Email are required to register as a new user"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            new_user = User.objects.create_user(
                username=username, password=password, email=email
            )
        except IntegrityError: 
            # UNIQUE constraint failed: auth_user.username
            return Response(
                data={
                    "message": "Username already exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(status=status.HTTP_201_CREATED)
