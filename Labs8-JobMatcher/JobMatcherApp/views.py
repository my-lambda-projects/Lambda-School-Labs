import json

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from oauth2_provider.models import AccessToken
from oauth2_provider.views import TokenView
from rest_framework import viewsets, mixins
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response

from JobMatcherApp.models import Employer, Seeker
from . import serializers


@swagger_auto_schema(methods=['get'],
                     responses={200: openapi.Response('Seeker or Employer profile', serializers.ProfileSerializer)})
@api_view(http_method_names=['GET'])
def me(request):
    """Returns representation of the authenticated user profile (Seeker or Employer) making the request."""

    if request.user.is_seeker:
        serializer = serializers.SeekerSerializer(instance=request.user.seeker)
    else:
        serializer = serializers.EmployerSerializer(instance=request.user.employer)

    return Response(data=serializer.data)


@swagger_auto_schema(methods=['post'], request_body=serializers.SignupSeekerSerializer)
@api_view(http_method_names=['POST'])
@permission_classes([])
def signup_seeker(request):
    """Signs up a Seeker and returns an access and refresh JSON web token pair"""

    serializer = serializers.SignupSeekerSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(data=serializer.data)


@swagger_auto_schema(methods=['post'], request_body=serializers.SignupEmployerSerializer)
@api_view(http_method_names=['POST'])
@permission_classes([])
def signup_employer(request):
    """Signs up a Employer and returns an access and refresh JSON web token pair"""

    serializer = serializers.SignupEmployerSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(data=serializer.data)


class ProfileTokenView(TokenView):
    """Returns OAuth2 access and refresh tokens in addition to user profile under 'profile' key"""

    def post(self, request, *args, **kwargs):
        # Get original response from OAuth2 library
        response = super().post(request=request, *args, **kwargs)
        # Return it in case any failures
        if response.status_code != 200:
            return response

        # Decode json body to add profile based on user type
        data = json.loads(response.content)
        user = AccessToken.objects.get(token=data['access_token']).user
        if user.is_seeker:
            data['profile'] = serializers.SeekerSerializer(instance=user.seeker).data
        else:
            data['profile'] = serializers.EmployerSerializer(instance=user.employer).data

        # Encode json and return the modified response
        response.content = json.dumps(data)
        return response


class SeekerViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.SeekerSerializer
    queryset = Seeker.objects.all()

    @action(methods=['get'], detail=False)
    def random(self, request):
        # TODO filter out if SKIPPED/ SUPER or CALL for any available jobs
        # Return a list of jobs that are allowed an action, if no jobs, empty
        seeker = self.get_queryset().order_by("?").first()
        serializer = self.get_serializer(instance=seeker)
        return Response(data=serializer.data)


class EmployerViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    serializer_class = serializers.EmployerSerializer
    queryset = Employer.objects.all()
