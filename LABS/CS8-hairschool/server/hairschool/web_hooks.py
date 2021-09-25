#Not sure if I need a seperate webhook file

import json
from django.http import HttpResponse

def my_webhook_view(request):
   event_json = json.loads(request.body)
  return HttpResponse(status=200)

