#!/usr/bin/env python
from django.contrib.auth.models import User
from django.db import models
from datetime import date
from uuid import uuid4


class Aircraft(models.Model):
    '''
    Aircraft Model
    Has many-to-one relationship with User
    '''
    SEL = 'Airplane SEL'
    SES = 'Airplane SES'
    MEL = 'Airplane MEL'
    MES = 'Airplane MES'
    license_choices = (
    (SEL, 'SEL'),
    (SES, 'SES'),
    (MEL, 'MEL'),
    (MES, 'MES'),
    )

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    man_type = models.CharField(max_length=200)
    tail_number = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    license_type = models.CharField(max_length=40, choices=license_choices, default="Airplane SEL")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.CharField(max_length=300)
    class Meta:
        verbose_name_plural = "Aircraft"

    def __str__(self):
        return f'<{self.__class__.__name__}: {self.man_type} {self.license_type}>'


class Flights(models.Model):
    '''
    Flights Model
    Has One-to-One relationship with Aircraft
    '''
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=200)
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    no_instument_app = models.FloatField(default=0.0, blank=True, null=True)
    no_ldg = models.FloatField(default=0.0, blank=True, null=True)
    cross_country = models.FloatField(default=0.0, blank=True, null=True)
    pic = models.FloatField(default=0.0, blank=True, null=True)
    dual_rec = models.FloatField(default=0.0, blank=True, null=True)
    actual_instr = models.FloatField(default=0.0, blank=True, null=True)
    sim_instr = models.FloatField(default=0.0, blank=True, null=True)
    day = models.FloatField(default=0.0, blank=True, null=True)
    night = models.FloatField(default=0.0, blank=True, null=True)
    airports_visited = models.CharField(max_length=100, default="Airports", blank=True)
    fly_date = models.DateField(default=date.today, blank=True, null=True)
    snippet = models.TextField(blank=True, default="snippet", null=True)
    license_type = models.CharField(max_length=40, default="Airplane SEL", null=False)
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, default=uuid4, null=True )
    total_hours = models.FloatField(default=0.0, blank=False)
    sv_html = models.CharField(max_length=300, blank=True)
    sv_script = models.CharField(max_length=300, blank=True)

    class Meta:
        verbose_name_plural = "flights"

    def __str__(self):
        return self.name


class Billing(models.Model):
    '''
    Billing Model
    One-to-One relation with User
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    premium = models.BooleanField(default=False)


class Instructor(models.Model):
    '''
    Instructor Model
    Many-to-One relation with User
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=75)
    description = models.CharField(max_length=200, blank=True)
    license_number = models.CharField(max_length=100, blank=True)
    ratings = models.CharField(max_length=200, blank=True)
    photo = models.CharField(max_length=200, blank=True)
    contact_number = models.CharField(max_length=30, blank=True)
    contact_email = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.name