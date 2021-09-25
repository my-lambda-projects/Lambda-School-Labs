from django.urls import include, path
from django.conf.urls import url
from . import views

urlpatterns = [
    url('registration', views.register),
    url('login', views.login),
    url('tokenregister', views.tokenRegister),
    url('updateuser', views.updateUser),
]
