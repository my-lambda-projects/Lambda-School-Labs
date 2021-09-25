from django.contrib import admin

# Register your models here.
from billing.models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['id', 'item', 'amount', 'currency', 'description', 'created_at', 'updated_at']
    ordering = ['-created_at']  # ORDER BY DESC
