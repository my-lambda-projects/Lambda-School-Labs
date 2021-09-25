from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', )


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Appointment
        fields = ('date', 'time', 'Stylist', 'Service', )


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Service
        fields = ('styling', 'price', )


class StylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stylist
        fields = ('full_name', 'availability', )


class User_FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User_Feedback
        fields = ('stylist', 'service', 
                  'consultationRating','customerServiceRating', 'timeRating', 'stylingRating',
                   'overallRating', 'overallFeedback',)
