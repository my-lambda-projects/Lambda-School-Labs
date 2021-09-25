"""flight_logs URL Configuration

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
from django.contrib import admin

# we probably don't need generics...
from rest_framework import routers, generics
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from flights.api import FlightsViewSet, AircraftViewSet, InstructorViewSet, BillingViewSet
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from django.conf import settings
from django.views.static import serve
from django.conf.urls import url
from flights.views import Filter3ViewSet, UserList, UpdatePassword, TextAPIView

# from stripe stuff
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'flights', FlightsViewSet)
router.register(r'aircraft', AircraftViewSet)
router.register(r'instructors', InstructorViewSet)
router.register(r'billing', BillingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('user_admin/', include('flights.urls')),
    re_path(r'^api-token-verify/', verify_jwt_token),
    re_path(r'^api-token-refresh/', refresh_jwt_token),
    url('^api/passwordchange/', UpdatePassword.as_view()),
    # endpoint for filtering flights by aircraft
    url('^api/filteredflights/(?P<aircraft>.+)/$', Filter3ViewSet.as_view()),
    # endpoint for Stripe Payments
    url(r'^api/', include('stripe_payments.urls')),
    # endpoint to return all flights separated by airplane license types
    url('^api/joined/', TextAPIView.as_view())
]
    # url(r'^media/(?P<path>.*)$', serve, { 'document_root': settings.MEDIA_ROOT, }),