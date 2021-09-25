from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.core.serializers import serialize
import json
from .models import *
from .serializers import *

# from channels.generic.websocket import WebsocketConsumer
# import json

class QuizConsumer(WebsocketConsumer):
  def connect(self):
    self.quiz_name = self.scope['url_route']['kwargs']['slug']
    self.quiz_group_name = 'chat_%s' % self.quiz_name

    # Join quiz group
    async_to_sync(self.channel_layer.group_add)(
      self.quiz_group_name,
      self.channel_name
    )

    self.accept()

  def disconnect(self, close_code):
    # Leave quiz group
    async_to_sync(self.channel_layer.group_discard)(
      self.quiz_group_name,
      self.channel_name
    )

  # Receive message from WebSocket
  def receive(self, text_data):
    text_data_json = json.loads(text_data)

    if 'answer_id' in text_data_json:
      answer = Answer.objects.get(id=text_data_json['answer_id'])
      team = Team.objects.get(id=text_data_json['team'])
      question = Question.objects.get(id=text_data_json['question_id'])
      student = Student.objects.get(id=text_data_json['id'])

      Student_Response.objects.create(student=student, response=answer)

      if answer.is_correct:
        team.score = team.score + 1
        team.save()
      question.number_of_responses = question.number_of_responses + 1
      question.save()
    elif 'index' in text_data_json:
      quiz = Quiz.objects.get(slug=text_data_json['slug'])
      quiz.index = quiz.index + 1
      quiz.save()

    quiz = QuizSerializer(Quiz.objects.get(slug=text_data_json['slug']))

    # Send message to quiz group
    async_to_sync(self.channel_layer.group_send)(
      self.quiz_group_name,
      {
        'type': 'chat_message',
        'message': quiz.data
      }
    )

  # Receive message from quiz group
  def chat_message(self, event):
    message = event['message']

    # Send message to WebSocket
    self.send(text_data=json.dumps(message))
