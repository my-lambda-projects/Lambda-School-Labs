from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter(trailing_slash=True)
router.register('seekers', views.SeekerViewSet, base_name='seeker')
router.register('employers', views.EmployerViewSet, base_name='employer')

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),

    # Oauth2 endpoints
    path('o/token/', views.ProfileTokenView.as_view(), name="token"),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),

    # Signup and profile info
    path('signup/seeker/', views.signup_seeker, name='signup_seeker'),
    path('signup/employer/', views.signup_employer, name='signup_employer'),
    path('me/', views.me, name='me'),

    # view sets
    path('', include(router.urls)),
]
