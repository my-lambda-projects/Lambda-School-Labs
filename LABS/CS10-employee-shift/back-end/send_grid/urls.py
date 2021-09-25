from django.conf.urls import url

from .views import index


urlpatterns = [
    url(r'^sendgrid/', index, name='sendgrid'),
]