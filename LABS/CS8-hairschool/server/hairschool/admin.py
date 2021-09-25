from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser,Appointment ,Service, Stylist, User_Feedback


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username', 'name']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register( Appointment)
admin.site.register(Service)
admin.site.register(Stylist)
admin.site.register(User_Feedback)
