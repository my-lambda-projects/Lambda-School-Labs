from rest_framework import generics

from . import models
from . import serializers


class UserListView(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


class AppointmentListView(generics.ListCreateAPIView):
    queryset = models.Appointment.objects.all()
    serializer_class = serializers.AppointmentSerializer


class ServiceListView(generics.ListCreateAPIView):
    queryset = models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer


class StylistListView(generics.ListCreateAPIView):
    queryset = models.Stylist.objects.all()
    serializer_class = serializers.StylistSerializer


class User_FeedbackListView(generics.ListCreateAPIView):
    queryset = models.User_Feedback.objects.all()
    serializer_class = serializers.User_FeedbackSerializer
