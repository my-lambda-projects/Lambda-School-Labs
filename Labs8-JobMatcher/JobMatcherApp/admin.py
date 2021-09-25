from django.contrib import admin

from .models import User, Employer, Seeker

# admin.py

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'first_name', 'last_name', 'is_seeker', 'is_employer', 'updated_at', 'created_at']
    ordering = ['-created_at']  # ORDER BY DESC


@admin.register(Seeker)
class SeekerAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'free_apps', 'credits', 'confirm_spending', 'created_at', 'updated_at']
    ordering = ['-created_at']  # ORDER BY DESC

    def email(self, instance):
        return instance.user.email


@admin.register(Employer)
class EmployerAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'free_calls', 'credits', 'postings', 'confirm_spending', 'created_at', 'updated_at']
    ordering = ['-created_at']  # ORDER BY DESC

    def email(self, instance):
        return instance.user.email
