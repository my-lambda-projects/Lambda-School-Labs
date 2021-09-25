from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from django.urls import reverse
from django.conf import settings


class Account(models.Model):
    logo = models.URLField(max_length=200)
    company = models.CharField(max_length=200)
    enabled = models.BooleanField(default=True)
    plan_expires = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.company


class HourOfOperation(models.Model):
    DAY_CHOICES = (
        ('M', 'Monday'),
        ('T', 'Tuesday'),
        ('W', 'Wednesday'),
        ('R', 'Thursday'),
        ('F', 'Friday'),
        ('S', 'Saturday'),
        ('U', 'Sunday')
    )
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    day = models.CharField(
        max_length=1,
        choices=DAY_CHOICES,
        default='M'
    )
    open_time = models.TimeField(auto_now=False, auto_now_add=False)
    close_time = models.TimeField(auto_now=False, auto_now_add=False)
    is_open = models.BooleanField(default=False)

    def __str__(self):
        return self.account.company


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    phone_number = models.CharField(max_length=14, blank=True, null=True)
    notes = models.TextField(max_length=400, blank=True, null=True)
    text_enabled = models.BooleanField(default=False)
    email_enabled = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class RequestedTimeOff(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('C', 'Canceled'), 
        ('A', 'Accepted'), 
        ('E', 'Expired')
    )

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    start_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    reason = models.CharField(max_length=200)
    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES,
        default='P'
    )

    def __str__(self):
        return self.profile.user.username
       
class Shift(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, blank=True, null=True)

    start_datetime =  models.DateTimeField(auto_now=False, auto_now_add=False)
    end_datetime =  models.DateTimeField(auto_now=False, auto_now_add=False)
    notes = models.TextField(max_length=400, blank=True, null=True)
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return self.account.company

class Availability(models.Model):
    DAY_CHOICES = (
        ('M', 'Monday'),
        ('T', 'Tuesday'),
        ('W', 'Wednesday'),
        ('R', 'Thursday'),
        ('F', 'Friday'),
        ('S', 'Saturday'),
        ('U', 'Sunday')
    )
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    day = models.CharField(
        max_length=1,
        choices=DAY_CHOICES,
        default='M'
    )
    start_time = models.TimeField(auto_now=False, auto_now_add=False)
    end_time = models.TimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.profile.user.username