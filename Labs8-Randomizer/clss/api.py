# from rest_framework import serializers, viewsets
# from .models import ClssName, StudentName, Participation

# class ClssNameSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = ClssName
#         fields = ('class_name')

# class ClssViewSet(viewsets.ModelViewSet):
#     serializer_class = ClssNameSerializer
#     queryset = ClssName.objects.all()