from django.contrib import admin
from .models import Account, Profile, HourOfOperation, Shift, Availability, RequestedTimeOff

# Register your models here.
admin.site.register((Account, Profile, HourOfOperation, Shift, Availability, RequestedTimeOff),)
