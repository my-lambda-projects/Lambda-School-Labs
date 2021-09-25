from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from twilio.twiml.messaging_response import MessagingResponse


@csrf_exempt
def sms_response(request):
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a text message
    msg = resp.message("Hello from Myshift!")

    # Add a picture message
    msg.media("https://files.slack.com/files-pri/T4JUEB3ME-FD63ABE0M/screen_shot_2018-10-02_at_4.54.20_pm.png")

    return HttpResponse(str(resp))

