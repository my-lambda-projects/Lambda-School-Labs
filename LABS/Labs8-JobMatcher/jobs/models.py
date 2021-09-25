from django.db import models
from django.utils.translation import gettext_lazy as _

from JobMatcherApp.models import BaseModel, Employer, SkillsField, Seeker


class Job(BaseModel):
    employer = models.ForeignKey(Employer, related_name='jobs', on_delete=models.CASCADE)
    title = models.CharField(_('desired title'), max_length=150, blank=True)
    salary_min = models.IntegerField(blank=True, null=True)  # Can be blank
    salary_max = models.IntegerField(blank=True, null=True)
    top_skills = SkillsField(size=20)
    extra_skills = SkillsField(size=20)
    familiar_with = SkillsField(size=20)
    description = models.CharField(max_length=10000, blank=True)
    requirements = models.CharField(max_length=10000, blank=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.id}: {self.title}'


class Match(BaseModel):
    employer = models.ForeignKey(Employer, related_name='matches', on_delete=models.CASCADE)
    seeker = models.ForeignKey(Seeker, related_name='matches', on_delete=models.CASCADE)
    job = models.ForeignKey(Job, related_name='matches', on_delete=models.CASCADE)

    SKIP = 'SKIP'
    SUPER = 'SUPER'
    CALL = 'CALL'
    APPLY = 'APPLY'

    EMPLOYER_CHOICES = (
        (SKIP, 'SKIP'),
        (SUPER, 'SUPER'),
        (CALL, 'CALL')
    )

    SEEKER_CHOICES = (
        (SKIP, 'SKIP'),
        (SUPER, 'SUPER'),
        (APPLY, 'APPLY')
    )

    # skip, super, call
    seeker_action = models.CharField(max_length=20, blank=True, choices=SEEKER_CHOICES)

    # skip, super, apply
    employer_action = models.CharField(max_length=20, blank=True, choices=EMPLOYER_CHOICES)

    is_archived_seeker = models.BooleanField(default=False)
    is_archived_employer = models.BooleanField(default=False)

    class Meta:
        # List of fields that will prevent duplicate instances and guarantee unique match instances
        # Multiple Field Uniqueness
        # Minimum fields for uniqueness
        unique_together = ['employer', 'seeker', 'job']

    def __str__(self):
        return f'{self.job_id}: {self.seeker_id} : {self.employer_id}'
