from django.urls import path

from . import views

urlpatterns = [
    # Billing
    path('send/', views.send_email)
]