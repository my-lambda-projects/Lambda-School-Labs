import stripe
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

from billing.models import Transaction

stripe.api_key = settings.STRIPE_SECRET_KEY


# Expecting an Authenticated User, based on the DEFAULT PERMISSION CLASSES in settings
@api_view(http_method_names=['POST'])
def charge(request):
    amount = Transaction.ITEM_AMOUNT[request.data['item']]
    currency = 'usd'
    description = 'Test Description'

    status = stripe.Charge.create(
        amount=amount,
        currency=currency,
        description=description,
        source=request.data['token']
    )

    # Creating a transaction instance, adding a row to the transaction table
    Transaction.objects.create(amount=amount, currency=currency, description=description, user=request.user)

    # Update metrics based on item
    profile = request.user.employer if request.user.is_employer else request.user.seeker
    if request.data['item'] == Transaction.POSTING1:
        profile.postings += 1
    elif request.data['item'] == Transaction.CREDIT100:
        profile.credits += 100
    elif request.data['item'] == Transaction.CREDIT5:
        profile.credits += 5

    profile.save()

    return Response(data=status)
