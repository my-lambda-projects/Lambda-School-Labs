from django.contrib import admin

from .models import Job, Match


# Register your models here.
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['id', 'employer', 'title', 'is_active', 'created_at', 'updated_at']
    ordering = ['-created_at']  # ORDER BY DESC


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['id', 'employer', 'job', 'seeker', 'seeker_action', 'employer_action', 'is_archived_seeker',
                    'is_archived_employer', 'created_at', 'updated_at']
    ordering = ['-created_at']  # ORDER BY DESC
