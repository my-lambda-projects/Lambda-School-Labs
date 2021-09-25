from django.db import models
import stripe

class Car(models.Model):
    name        = models.CharField(max_length=234)
    year        = models.CharField(max_length=4)
    charge_id   = models.CharField(max_length=234)

stripe.api_key = 'sk_test_HP05OJENWcUnfccM9cXT1yLS' # settings.STRIPE_SECRET_KEY

def checkout(request):

    new_car = Car(
        model = "Honda Civic",
        year  = 2017
    )

    if request.method == "POST":
        token    = request.POST.get("stripeToken")

    try:
        charge  = stripe.Charge.create(
            amount      = 2000,
            currency    = "usd",
            source      = token,
            description = "The product charged to the user"
        )

        new_car.charge_id   = charge.id

    except stripe.error.CardError as ce:
        return False, ce

    else:
        new_car.save()
        return redirect("thank_you_page")
        # The payment was successfully processed, the user's card was charged.
        # You can now redirect the user to another page or whatever you want

