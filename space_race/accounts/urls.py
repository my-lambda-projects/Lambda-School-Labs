from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.UserListView.as_view()),
]

"""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^accounts/$', views.UserCreate.as_view(), name='account-create'),
]
"""