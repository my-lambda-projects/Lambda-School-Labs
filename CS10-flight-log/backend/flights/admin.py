from django.contrib import admin
from .models import Flights, Aircraft, Instructor, Billing

admin.site.register(Flights)
# Register your models here.

admin.site.register(Aircraft)
admin.site.register(Instructor)
admin.site.register(Billing)