from django.shortcuts import render
import os
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

import sendgrid
from sendgrid.helpers.mail import *

@csrf_exempt
def index(request):
    sg = sendgrid.SendGridAPIClient(
        apikey=os.environ.get('SENDGRID_API_KEY')
    )
    from_email = Email('brandonhopper0@gmail.com')
    to_email = Email('wladimir917@gmail.com')
    subject = 'Test Email for myshift'
    content = Content(
        'text/plain',
        'and easy to do anywhere, even with Python'
    )
    mail = Mail(from_email, subject, to_email, content)
    response = sg.client.mail.send.post(request_body=mail.get())

    return HttpResponse('Email Sent!')