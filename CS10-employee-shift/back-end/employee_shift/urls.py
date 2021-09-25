"""employee_shift URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib.auth.models import User, Group
from django.contrib import admin
admin.autodiscover()

from rest_framework import generics, permissions, serializers, routers

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope 
from stripe_payment.api import checkout, my_webhook_view
from sms import urls
from send_grid.views import index

from shiftapp.api import (
    UserViewSet, 
    GroupViewSet, 
    SignUp, 
    AccountViewSet, 
    ProfileViewSet,  
    UserProfileViewSet, 
    AvailabilityViewSet, 
    RequestedTimeOffViewSet, 
    ShiftViewSet, 
    HourOfOperationViewSet
)


router = routers.DefaultRouter()    

router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'userprofile', UserProfileViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'requestoff', RequestedTimeOffViewSet)
router.register(r'shifts', ShiftViewSet)
router.register(r'availabilities', AvailabilityViewSet)
router.register(r'hoo', HourOfOperationViewSet)




urlpatterns = [
   path('admin/', admin.site.urls),
   path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
#    path('groups/', GroupViewSet.as_view()),
   path('api/', include(router.urls)),
   path('api/sign_up/', SignUp.as_view()),
   path(r'create-charge/', checkout, name="cout"),
   path(r'payments/', my_webhook_view, name="pay"),
   path(r'sms/', include('sms.urls')),
   path(r'sendgrid/', index, name='sendgrid'),
]