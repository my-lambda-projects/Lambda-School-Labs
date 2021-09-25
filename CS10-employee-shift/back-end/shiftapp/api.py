from django.urls import path, include
from django.contrib.auth.models import User, Group
from django.contrib import admin
admin.autodiscover()

from rest_framework import generics, permissions, serializers
from rest_framework.filters import (
        SearchFilter,
        OrderingFilter
    )
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from .permissions import IsAuthenticatedOrCreate, IsOwnerOrReadOnly
from shiftapp.serializers import (
    UserSerializer,
    ProfileSerializer,
    UserProfileSerializer,
    AccountUserProfileSerializer, 
    GroupSerializer, 
    AccountSerializer, 
    RequestedTimeOffSerializer, 
    ShiftSerializer, 
    HourOfOperationSerializer, 
    AvailabilitySerializer
)

from rest_framework import viewsets, status
from rest_framework.response import Response
from shiftapp.models import Profile, Account, RequestedTimeOff, Shift, HourOfOperation, Availability
# Create the API views

def is_employee(user):
    return user.groups.filter(name='employee').exists()

def is_manager(user):
    return user.groups.filter(name='manager').exists()

def is_owner(user):
    return user.groups.filter(name='owner').exists()

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    # required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class SignUp(generics.CreateAPIView):
    # permission_classes = (IsAuthenticatedOrCreate,)
    permission_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Profile.objects.all()
    serializer_class = AccountUserProfileSerializer


class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    serializer_class = AccountSerializer
    queryset = Account.objects.none()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        profile = Profile.objects.filter(user=user)
        account_id = profile[0].account

        if is_manager(user):
            return Account.objects.filter(account_id=account_id)
        else:
            if is_employee(user):
              return Account.objects.none()

class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    # permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()

    serializer_class = ProfileSerializer
    filter_backends = [SearchFilter]
    search_fields = ['user__username', 'user__first_name']

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        profile = Profile.objects.filter(user=user)
        account_id = profile[0].account

        if is_manager(user):
            return Profile.objects.filter(account=account_id).exclude(user=user)
        else:
            if is_employee(user):
              return Profile.objects.filter(user=user)

class UserProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    # permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.none()

    serializer_class = UserProfileSerializer

    def get_queryset(self, *args, **kwargs):
        user = self.request.user

        return Profile.objects.filter(user=user)


class RequestedTimeOffViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    serializer_class = RequestedTimeOffSerializer
    queryset = RequestedTimeOff.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user

        profile = Profile.objects.filter(user=user)
        account_id = profile[0].account
        print()

        if is_manager(user):
            return RequestedTimeOff.objects.filter(profile__account=account_id)
        else:
            if is_employee(user):
              return RequestedTimeOff.objects.filter(profile__account=account_id, profile__user=user)

class ShiftViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        profile = Profile.objects.filter(user=user)
        account_id = profile[0].account

        if is_manager(user):
            return Shift.objects.filter(account=account_id)
        else:
            if is_employee(user):
              return Shift.objects.filter(account=account_id, profile__user=user)

class HourOfOperationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    serializer_class = HourOfOperationSerializer
    queryset = HourOfOperation.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        profile = Profile.objects.filter(user=user)
        account_id = profile[0].account

        if is_manager(user):
            return HourOfOperation.objects.filter(account=account_id)
        else:
            if is_employee(user):
              return HourOfOperation.objects.filter(account=account_id, profile__user=user)


class AvailabilityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    serializer_class = AvailabilitySerializer
    queryset = Availability.objects.all()



