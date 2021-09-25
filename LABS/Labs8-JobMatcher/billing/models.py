from django.conf import settings
from django.db import models

# Create your models here.
from JobMatcherApp.models import BaseModel


class Transaction(BaseModel):
    # Since we have a custom user, we can import a string using the settings in the AUTH USER MODEL
    # IF we try to delete a user with transaction, we will PREVENT the cascade
    # LInking to the auth user, then only requires 2 fields, and then allow NULL.. pain...
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='transaction', on_delete=models.PROTECT)

    CREDIT100 = 'CREDIT100'
    CREDIT5 = 'CREDIT5'
    POSTING1 = 'POSTING1'

    ITEM_CHOICES = (
        (CREDIT100, 'CREDIT100'),
        (CREDIT5, 'CREDIT5'),
        (POSTING1, 'POSTING1')
    )

    ITEM_AMOUNT = {
        CREDIT100: 10*100,
        CREDIT5: 1*100,
        POSTING1: 10*100
    }

    item = models.CharField(max_length=20, choices=ITEM_CHOICES)

    amount = models.IntegerField()
    currency = models.CharField(max_length=3, default='usd')
    description = models.CharField(max_length=500, blank=True)
