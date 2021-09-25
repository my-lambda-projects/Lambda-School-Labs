from django.contrib.auth.models import AbstractUser
from django.db import models
# from django.contrib.auth.models import User
from uuid import uuid4


class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    
    def __str__(self):
        return self.email


class Appointment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    time = models.DateTimeField()
    Stylist = models.CharField(max_length=30)
    Service = models.CharField(max_length=30)

#    def __unicode__(self):
#        return self.name


class Service(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    styling = models.CharField(max_length=30)
    price = models.CharField(max_length=30)


class Stylist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    full_name = models.CharField(max_length=30)
    availability = models.CharField(max_length=30)


class User_Feedback(models.Model):
    Stylist = models.CharField(max_length=30)
    Service = models.CharField(max_length=30)
    # Date = models.DateTimeField(auto_now_add=True)
    # Time = models.DateTimeField()
    STARS = ((1, 'one'),
             (2, 'two'),
             (3, 'three'),)
    Consultation = models.IntegerField(choices=STARS, default=3)
    Notes = models.CharField(max_length=300)
    On_time = models.IntegerField(choices=STARS, default=3)
    Notes = models.CharField(max_length=300)
    Styling = models.IntegerField(choices=STARS, default=3)
    Notes = models.CharField(max_length=300)
    Customer_Service = models.IntegerField(choices=STARS, default=3)
    Notes = models.CharField(max_length=300)
    Overall = models.IntegerField(choices=STARS, default=3)
    Notes = models.CharField(max_length=300)


def __unicode__(self):
    return self.name
