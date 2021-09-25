from django.contrib import admin
from .models import (
    Recipe, Ingredients, User
)

# Register your models here.

class DET_AppAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'last_modified')


admin.site.register((Recipe, User), DET_AppAdmin)
admin.site.register(Ingredients)
