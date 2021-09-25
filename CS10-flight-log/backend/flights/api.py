from rest_framework import serializers, viewsets
from .models import Flights, Aircraft, Instructor, Billing


class FlightsSerializer(serializers.HyperlinkedModelSerializer):
    '''
    Serializer to Access Flights Model
    '''
    class Meta:
        model = Flights
        fields = ('name', 'remarks', 'created_at', 'no_instument_app',
                  'no_ldg', 'cross_country', 'pic', 'dual_rec', 'actual_instr',
                  'sim_instr', 'day', 'night', 'airports_visited', 'fly_date',
                  'snippet', 'aircraft', 'license_type', 'total_hours', 'sv_html', 'sv_script', 'id')
                  # added pic_count 

    def create(self, validated_data):
        user = self.context['request'].user
        flight = Flights.objects.create(user=user, **validated_data)
        return flight

class FlightsViewSet(viewsets.ModelViewSet):
    '''
    Viewset to decide what to show
    '''
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Flights.objects.filter(user=user).order_by('-created_at')


class InstructorSerializer(serializers.HyperlinkedModelSerializer):
    '''
    Serializer to access Instructor Model
    '''
    class Meta:
        model = Instructor
        fields = ( 'id', 'name', 'description', 
                    'license_number', 'ratings', 'photo', 
                        'contact_number', 'contact_email')

    def create(self, validated_data):
        user = self.context['request'].user
        instructor = Instructor.objects.create(user=user, **validated_data)
        return instructor


class InstructorViewSet(viewsets.ModelViewSet):
    '''
    Viewset for Instructor fields
    '''
    serializer_class = InstructorSerializer
    queryset = Instructor.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Instructor.objects.none()
        else:
            return Instructor.objects.filter(user=user).order_by('-created_at')


class AircraftSerializer(serializers.HyperlinkedModelSerializer):
    '''
    Serializer to access Aircraft 
    '''
    class Meta:
        model = Aircraft
        fields = ('man_type', 'tail_number', 'license_type', 'id', 'photo')

    def create(self, validated_data):
        user = self.context['request'].user
        aircraft = Aircraft.objects.create(user=user, **validated_data)
        return aircraft

    

class AircraftViewSet(viewsets.ModelViewSet):
    '''
    Viewset for Aircraft
    '''
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()
    
    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Aircraft.objects.none()
        else:
            return Aircraft.objects.filter(user=user).order_by('-created_at')


class BillingsSerializer(serializers.HyperlinkedModelSerializer):
    '''
    Serializer for Billing Model
    '''
    class Meta:
        model = Billing
        fields = ('premium',)

    def create(self, validated_data):
        user = self.context['request'].user
        billing = Billing.objects.create(user=user, **validated_data)
        return billing


class BillingViewSet(viewsets.ModelViewSet):
    '''
    Viewset for Billing
    '''
    serializer_class = BillingsSerializer
    queryset = Billing.objects.none()

    def get_queryset(self):
        user = self.request.user
        
        return Billing.objects.filter(user=user)


'''
class LicenseViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Aircraft.objects.none()
        else:
            return Aircraft.objects.filter(license_type='sel')

# hard coded way of filtering aircraft
# need to reimplement the user filter
class FilterAircraftViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Aircraft.objects.filter(user=user)


# tried to aggregate filtered data.  Multiple attempts.  Not yet working also needs to reimplement user filter
class FilterFlightsViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        print("FLIGHTS USER: ", self.request.user)
        user = self.request.user
        aircraft = self.request.aircraft.id
        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Flights.objects.filter(user=user, aircraft=aircraft)
''' 