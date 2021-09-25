from django.shortcuts import render
from rest_framework import generics

from . import models
from . import serializers

class UserListView(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer



""" Ignore this for now. May need it later.
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

class UserCreate(APIView):
    
#  Creates the user. 
    

    def post(self, request, format='json'):
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                # user = serializer.save()
                serializer.save()
                if user:
                    token = Token.objects.create(user=user)
                    json = serializer.data
                    json['token'] = token.key
                    return Response(json, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""