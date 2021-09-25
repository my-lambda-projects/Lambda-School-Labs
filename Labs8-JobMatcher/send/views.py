from django.core.mail import EmailMessage
from django.core.mail.message import make_msgid
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Expecting an Authenticated User, based on the DEFAULT PERMISSION CLASSES in settings
from JobMatcher import settings
from jobs.models import Match


@api_view(http_method_names=['POST'])
def send_email(request):
    match_id = request.data['match_id']

    # Get the recipients email based on the
    if request.user.is_employer:

        # We can use get() because there is only one instance/row
        recipient = Match.objects.get(id=match_id).seeker.user

    else:
        recipient = Match.objects.get(id=match_id).employer.user

    # Set the emails fields:
    subject = 'You have a match from Seek Geek!'
    reply_to = request.user.email
    # to_email = recipient.email
    to_email = 'seekgeekapp@gmail.com'
    email_message = f"Hello {recipient.first_name},  " \
        f"\nYour match on Seek Geek, {request.user.first_name}, " \
        f"is interested in connecting with you, please reach out to them. " \
        f"\nHere's their email address: {reply_to}"

    if 'message' in request.data:
        email_message += f"\nHere's their message: {request.data['message']}"

    email = EmailMessage(
        subject=subject,
        body=email_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[to_email],
        reply_to=[reply_to],
        headers={"Message - ID": make_msgid(domain='seekgeek.app')},
    )

    try:
        email.send(fail_silently=False)
    except Exception as e:
        return Response({"message": 'Error while sending email', 'error': str(e)}, status=500)

    return Response({"message": 'Email was sent'})
