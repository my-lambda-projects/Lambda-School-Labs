"""rocketmaster URL Configuration

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
from django.conf import settings
from django.conf.urls import include
from django.urls import path, re_path
from rest_framework_jwt.views import ObtainJSONWebToken, verify_jwt_token
from rocketsapp.views import CustomJWTSerializer, RegisterUsers, GetUser, UpdateUser, UpdatePassword
from django.views.decorators.csrf import csrf_exempt
import oauth2_provider.views as oauth2_views

from rocketsapp.oAuthView import ApiEndpoint

from rocketsapp.api import RegisterClasses, RegisterRockets, RegisterStudents, \
                           GetClasses, GetStudents, GetRockets, GetQuestion2D, \
                           GetQuestion2W, GetQuestion2M, UpdateClass, UpdateStudent, \
                           UpdateRocket, UpdateQuestion2D, UpdateQuestion2W, \
                           UpdateQuestion2M, CreateSubscription, GetRocketsByClassName, \
                           RemoveStudent, RemoveClass, RemoveRocket,\
                           BuildEmail, IsPremium

# endpoints for oAuth
oauth2_endpoint_views = [
    re_path(r'^authorize/$', oauth2_views.AuthorizationView.as_view(), name="authorize"),
    re_path(r'^token/$', oauth2_views.TokenView.as_view(), name="token"),
]

if settings.DEBUG:
    # OAuth2 Application Management endpoints
    oauth2_endpoint_views += [
        re_path(r'^applications/$', oauth2_views.ApplicationList.as_view(), name="list"),
        re_path(r'^applications/register/$', oauth2_views.ApplicationRegistration.as_view(), name="register"),
        re_path(r'^applications/(?P<pk>\d+)/$', oauth2_views.ApplicationDetail.as_view(), name="detail"),
        re_path(r'^applications/(?P<pk>\d+)/delete/$', oauth2_views.ApplicationDelete.as_view(), name="delete"),
        re_path(r'^applications/(?P<pk>\d+)/update/$', oauth2_views.ApplicationUpdate.as_view(), name="update"),
    ]

    # OAuth2 Token Management endpoints
    oauth2_endpoint_views += [
        re_path(r'^authorized-tokens/$', oauth2_views.AuthorizedTokensListView.as_view(), name="authorized-token-list"),
        re_path(r'^authorized-tokens/(?P<pk>\d+)/delete/$', oauth2_views.AuthorizedTokenDeleteView.as_view(),
            name="authorized-token-delete"),
    ]

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^login/', csrf_exempt(ObtainJSONWebToken.as_view(serializer_class=CustomJWTSerializer))),
    re_path(r'^register/', csrf_exempt(RegisterUsers.as_view())),
    re_path(r'^getuser/', csrf_exempt(GetUser.as_view())),
    re_path(r'^updateuser/', csrf_exempt(UpdateUser.as_view())),
    re_path(r'^updatepassword/', csrf_exempt(UpdatePassword.as_view())),

    re_path(r'^addclass/', csrf_exempt(RegisterClasses.as_view())),
    re_path(r'^addrocket/', csrf_exempt(RegisterRockets.as_view())),
    re_path(r'^addstudent/', csrf_exempt(RegisterStudents.as_view())),
    re_path(r'^removestudent/', csrf_exempt(RemoveStudent.as_view())),
    re_path(r'^removeclass/', csrf_exempt(RemoveClass.as_view())),
    re_path(r'^removerocket/', csrf_exempt(RemoveRocket.as_view())),

    re_path(r'^getclasses/', csrf_exempt(GetClasses.as_view())),
    re_path(r'^getrockets/', csrf_exempt(GetRockets.as_view())),
    re_path(r'^getstudents/', csrf_exempt(GetStudents.as_view())),
    re_path(r'^getquestion2d/', csrf_exempt(GetQuestion2D.as_view())),
    re_path(r'^getquestion2w/', csrf_exempt(GetQuestion2W.as_view())),
    re_path(r'^getquestion2m/', csrf_exempt(GetQuestion2M.as_view())),
    re_path(r'^getrocketsbyclassname/', csrf_exempt(GetRocketsByClassName.as_view())),
    
    re_path(r'^updateclass/', csrf_exempt(UpdateClass.as_view())),
    re_path(r'^updatestudent/', csrf_exempt(UpdateStudent.as_view())),
    re_path(r'^updaterocket/', csrf_exempt(UpdateRocket.as_view())),
    re_path(r'^updatequestion2d/', csrf_exempt(UpdateQuestion2D.as_view())),
    re_path(r'^updatequestion2w/', csrf_exempt(UpdateQuestion2W.as_view())),
    re_path(r'^updatequestion2m/', csrf_exempt(UpdateQuestion2M.as_view())),

    re_path(r'^buildemail/', csrf_exempt(BuildEmail.as_view())),

    re_path(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    re_path(r'^home/', csrf_exempt(GetUser.as_view())),
    re_path(r'^subscribe', csrf_exempt(CreateSubscription.as_view())),
    re_path(r'^api/test', ApiEndpoint.as_view()),
    re_path(r'^ispremium', csrf_exempt(IsPremium.as_view()))
]
