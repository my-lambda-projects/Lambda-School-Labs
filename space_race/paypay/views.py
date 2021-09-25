from django.shortcuts import render
from backend import settings

def index(request):

    context = { "stripe_key": settings.STRIPE_PUBLIC_KEY }
    return render(request, "index.html", context)
