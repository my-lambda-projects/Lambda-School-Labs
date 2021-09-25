from django.urls import path

from . import views

urlpatterns = [
    # Billing
    path('charge/', views.charge, name='charge')
]
