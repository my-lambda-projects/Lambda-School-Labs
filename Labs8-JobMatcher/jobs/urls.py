from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter(trailing_slash=True)
router.register('jobs', views.JobViewSet, base_name='job')
router.register('matches', views.MatchViewSet, base_name='match')

urlpatterns = [
    # view sets
    path('', include(router.urls)),
]
