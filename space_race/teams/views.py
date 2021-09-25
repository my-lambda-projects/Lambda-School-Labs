from rest_framework import generics

from .models import Quiz, Student, Team, Question, Answer
from .serializers import QuizSerializer, StudentSerializer, QuizModelSerializer, TeamModelSerializer, QuestionModelSerializer, AnswerSerializer

class ListQuiz(generics.ListCreateAPIView):
    serializer_class = QuizSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Quiz.objects.none()
        elif user.is_superuser:
            return Quiz.objects.all()
        return Quiz.objects.filter(user=user)

class DetailQuiz(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Quiz.objects.none()
        elif user.is_superuser:
            return Quiz.objects.all()
        return Quiz.objects.filter(user=user)

class DetailQuizSlug(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_field = 'slug'

class ListQuizModel(generics.ListCreateAPIView):
    serializer_class = QuizModelSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Quiz.objects.none()
        elif user.is_superuser:
            return Quiz.objects.all()
        return Quiz.objects.filter(user=user)

class DetailQuizModel(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuizModelSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Quiz.objects.none()
        elif user.is_superuser:
            return Quiz.objects.all()
        return Quiz.objects.filter(user=user)

class ListTeam(generics.ListCreateAPIView):
    serializer_class = TeamModelSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Team.objects.none()
        elif user.is_superuser:
            return Team.objects.all()
        return Team.objects.filter(user=user)

    """ Override generic create to create more than one team at a time"""
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]
            
            if isinstance(data, list):
                kwargs["many"] = True
        return super(ListTeam, self).get_serializer(*args, **kwargs)

class DetailTeam(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TeamModelSerializer
    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Team.objects.none()
        elif user.is_superuser:
            return Team.objects.all()
        return Team.objects.filter(user=user)

class ListQuestion(generics.ListCreateAPIView):
    serializer_class = QuestionModelSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Question.objects.none()
        elif user.is_superuser:
            return Question.objects.all()
        return Question.objects.filter(user=user)

class DetailQuestion(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuestionModelSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Question.objects.none()
        elif user.is_superuser:
            return Question.objects.all()
        return Question.objects.filter(user=user)

class ListAnswer(generics.ListCreateAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Answer.objects.none()
        elif user.is_superuser:
            return Answer.objects.all()
        return Answer.objects.filter(user=user)

    """ Override generic create to create more than one answer at a time"""
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]
            
            if isinstance(data, list):
                kwargs["many"] = True
        return super(ListAnswer, self).get_serializer(*args, **kwargs)

class DetailAnswer(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Answer.objects.none()
        elif user.is_superuser:
            return Answer.objects.all()
        return Answer.objects.filter(user=user) 


class ListStudent(generics.ListCreateAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Student.objects.none()
        elif user.is_superuser:
            return Student.objects.all()
        return Student.objects.filter(user=user)

class DetailStudent(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Student.objects.none()
        elif user.is_superuser:
            return Student.objects.all()
        return Student.objects.filter(user=user)
