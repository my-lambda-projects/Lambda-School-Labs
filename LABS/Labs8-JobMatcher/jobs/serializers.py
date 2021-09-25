from rest_framework import serializers

from JobMatcherApp.serializers import EmployerSerializer, SeekerSerializer
from jobs.models import Job, Match


class JobSerializer(serializers.ModelSerializer):
    """Serializer used for representing Job after signup."""

    # Employer Field Definition
    employer = EmployerSerializer(read_only=True)

    class Meta:
        model = Job
        fields = ('id', 'employer', 'title', 'salary_min', 'salary_max', 'top_skills', 'extra_skills',
                  'familiar_with', 'description', 'requirements', 'is_active')

    def create(self, validated_data):
        employer = self.context['request'].user.employer

        employer.postings -= 1
        employer.credits += 100
        employer.save()

        # Create a job
        # return Job.objects.create(employer=employer, **validated_data)
        # Since we already have an instance of the employer, we can create the job directly
        return employer.jobs.create(**validated_data)


class MatchSerializer(serializers.ModelSerializer):
    employer = EmployerSerializer(read_only=True)
    seeker = SeekerSerializer(read_only=True)
    job = JobSerializer(read_only=True)
    job_id = serializers.CharField(max_length=10)
    seeker_id = serializers.CharField(max_length=10)
    employer_id = serializers.CharField(max_length=10)

    class Meta:
        model = Match
        # These are the only fields that are validated and represented
        fields = (
            'id', 'job', 'job_id', 'seeker', 'seeker_id', 'employer', 'employer_id', 'seeker_action', 'employer_action',
            'is_archived_employer', 'is_archived_seeker')

    # TODO finish validation logic, seeker
    # Purpose here is to Raise an exception or modify field before becoming validated data
    # def validate(self, attrs):
    #     request = self.context['request']
    #
    #     if attrs['seeker_action'] == 'skip' or attrs['employer_action'] == 'skip':
    #         return attrs
    #
    #     if request.user.is_employer:
    #         # Check if employer_id is valid
    #         employer = request.user.employer
    #
    #         if attrs['employer_id'] != employer.id:
    #             raise serializers.ValidationError(
    #                 {'employer_id': ['Your employer id is not allowed to make matches on this account']})
    #
    #         # Check if the employer has enough credits and if the action
    #         # if call then does he have free calls, cool, have credits, cool, otherwise raise Error
    #         # if not (employer.free_calls > 0 or employer.credits > 0):
    #         #     pass
    #             # raise serializers.ValidationError({'employer_id': ['You either do not have credits or free calls']})
    #
    #     elif request.user.is_seeker:
    #         pass
    #
    #     return attrs

    # SKIP first, CALL, then Super and same for seeker.
    def create(self, validated_data):
        request = self.context['request']

        match, match_created = Match.objects.get_or_create(employer_id=validated_data['employer_id'],
                                                           seeker_id=validated_data['seeker_id'],
                                                           job_id=validated_data['job_id'])

        if request.user.is_employer:
            # Another way to get the employer id
            # employer_id = request.user.employer.id

            # All fields are here from the request
            # Validated data has seeker_id, job_id
            # Employer_id from the request
            profile = request.user.employer

            if validated_data['employer_action'] == Match.SKIP:
                match.employer_action = match.SKIP
            elif validated_data['employer_action'] == Match.SUPER:
                match.employer_action = match.SUPER

                # Decrement 10 credits per SUPER
                # We will validate this in the validation prior to creation
                profile.credits -= 10

            elif validated_data['employer_action'] == Match.CALL:
                match.employer_action = match.CALL

                # This check is part of the logic not to check if the free_calls is available
                if profile.free_calls > 0:
                    profile.free_calls -= 1
                else:
                    profile.credits -= 1

            # Update credits()
            # check action and update the credits appropriately
            # employer.credits -= 1
            # employer.save()

        else:
            # Get the employer_id from the Job Model
            # employer_id = Job.objects.get(id=validated_data['job_id']).employer_id
            # seeker_id = request.user.seeker.id
            # return Match.objects.create(seeker_id=seeker_id, employer_id=employer_id, **validated_data)

            profile = request.user.seeker

            if validated_data['seeker_action'] == Match.SKIP:
                match.seeker_action = match.SKIP
            elif validated_data['seeker_action'] == Match.SUPER:
                match.seeker_action = match.SUPER

                profile.credits -= 10

            elif validated_data['seeker_action'] == Match.APPLY:
                match.seeker_action = match.APPLY

                # If free is greater than 0
                if profile.free_apps > 0:
                    profile.free_apps -= 1
                else:
                    profile.credits -= 1

        profile.save()
        match.save()
        return match
