from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class ClssManager(models.Manager):
    def create_class(self, teacher, class_name):
        newClass = self.create(teacher=teacher, class_name=class_name)
        return newClass

class ClssName(models.Model):
   teacher = models.ForeignKey(User, on_delete=models.CASCADE)
   class_name = models.CharField(max_length=200)
   id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
   created_at = models.DateTimeField(auto_now_add=True)
   last_modified = models.DateTimeField(auto_now=True)
   manager = ClssManager()
   
   def __str__(self):
       return self.class_name

class StudentManager(models.Manager):
    def create_student(self, course, first, last):
        newStudent = self.create(enrolled=course, student_name_first=first, student_name_last=last)
        return newStudent

class StudentName(models.Model):
    enrolled = models.ForeignKey(ClssName, on_delete=models.CASCADE)
    student_name_first = models.CharField(max_length=200)
    student_name_last = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    objects=StudentManager()

    def __str__(self):
       return self.student_name_first+self.student_name_last

class ParticipationManager(models.Manager):
    def create_participation(self, student, participate):
        newParticipation = self.create(student=student, participate=participate)
        return newParticipation


class Participation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    student = models.ForeignKey(StudentName, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    participate = models.NullBooleanField()
    manager = ParticipationManager()

    def __str__(self):
        return str(self.student)+':'+str(self.date)+':'+str(self.participate)

@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
   if created:
       Token.objects.create(user=instance)