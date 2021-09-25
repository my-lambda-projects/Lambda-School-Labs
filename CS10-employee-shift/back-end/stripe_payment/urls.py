from django.conf.urls import url

from .api import checkout

urlpatterns = [
    url(r'^create-charge/$', checkout, name="cout"),

]