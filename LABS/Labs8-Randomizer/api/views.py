from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import json

from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


@csrf_exempt
def register(request):
    data = json.loads(request.body)
    email = data['username']
    username = data['username']
    password1 = data['password1']
    password2 = data['password2']
    user=User(email=email, username=username)
    if len(username) < 3:
        response = JsonResponse({"error":"Username must be at least 3 characters."}, safe=True, status=500)
    elif len(password1) < 5:
        response = JsonResponse({"error":"Password must be at least 5 characters."}, safe=True, status=500)
    elif password1 != password2:
        response = JsonResponse({"error":"The two password fields didn't match."}, safe=True, status=500)
    else:
      try:
          user.validate_unique()
      except ValidationError:
          response = JsonResponse({"error":"A user with that username already exists."}, safe=True, status=500)
      else:
          user.set_password(password1)
          user.save()
          response = JsonResponse({"key":str(user.auth_token)}, safe=True, status=201)
    return response

@csrf_exempt
def login(request):
    data = json.loads(request.body)
    email = data['username']
    password = data['password']
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        response = JsonResponse({"error":"User does not exist."}, safe=True, status=500)
    else:
        if user.check_password(password):
            response = JsonResponse({"key":str(user.auth_token)}, safe=True, status=200)
        else:
            response = JsonResponse({"error":"Unable to log in with provided credentials."}, safe=True, status=500)
    return response

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def tokenRegister(request):
    data = json.loads(request.body)
    username = data['username']
    email = data['email']
    DNE = False
    try:
        user = User.objects.get(username=username)
        response = JsonResponse({"key":str(user.auth_token)}, safe=True, status=200)
    except User.DoesNotExist:
        # response = JsonResponse({"error": "User not here"}, safe=True, status=500)
        DNE = True
    if DNE == True:
        user = User(username=username, email=email)
        user.save()
        response = JsonResponse({"key":str(user.auth_token)}, safe=True, status=200)
    return response


@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def updateUser(request):
    data = json.loads(request.body)
    user = request.user
    # print(user)
    email = data['email']
    password1 = data['password1']
    password2 = data['password2']
    try:
        user2 = User.objects.get(email=user.email)
        # print("are you here",user2)
        user2.email=email
        user2.set_password(password2)
        user2.username=email
        user2.save()
        response = JsonResponse({"email":str(user2.email)}, safe=True, status=200)
    except User.DoesNotExist:
        response = JsonResponse({"error": "User not here"}, safe=True, status=500)
    return response

