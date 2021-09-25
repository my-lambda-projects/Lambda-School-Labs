from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListQuiz.as_view()),
    path('<int:pk>/', views.DetailQuiz.as_view()),
    path('<slug:slug>/', views.DetailQuizSlug.as_view()),
    # quizzes
    path('quizzes', views.ListQuizModel.as_view()),
    path('quizzes/<int:pk>', views.DetailQuizModel.as_view()),
    # students
    path('students', views.ListStudent.as_view()),
    path('students/<int:pk>', views.DetailStudent.as_view()),
    #teams
    path('teams', views.ListTeam.as_view()),
    path('teams/<int:pk>', views.DetailTeam.as_view()),
    #questions
    path('questions', views.ListQuestion.as_view()),
    path('questions/<int:pk>', views.DetailQuestion.as_view()),
    #answers
    path('answers', views.ListAnswer.as_view()),
    path('answers/<int:pk>', views.DetailAnswer.as_view()),
]
