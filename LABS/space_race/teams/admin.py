from django.contrib import admin

from .models import Quiz, Question, Team, Answer

admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Team)
admin.site.register(Answer)
