"""JobMatcher URL Configuration

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
from django.urls import path, include
from django.views.generic import RedirectView

from JobMatcherApp.docs import schema_view

# These are the base routes for each application. We only have 1 application
# at this. There's always an admin application. (so theres 2 application)

urlpatterns = [
    path('', RedirectView.as_view(url='api/v1/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/v1/', include('JobMatcherApp.urls')),
    path('api/v1/', include('billing.urls')),
    path('api/v1/', include('jobs.urls')),
    path('api/v1/', include('send.urls')),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
