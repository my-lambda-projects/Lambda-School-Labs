from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User, AbstractUser

# All models are subject to change and can be altered to meet our needs

class User(AbstractUser):
    is_premium       = models.BooleanField(default = False)
    customerID       = models.CharField(max_length=256, blank=True, default='')

class Class(models.Model):
    id            = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    className     = models.CharField(max_length=100, blank = False)
    user          = models.ForeignKey(User, default = '', blank = False, on_delete=models.CASCADE)
    created_at    = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f'{self.className}'

    class Meta:
        db_table            = 'Classes'
        verbose_name_plural = 'classes'

class Rocket(models.Model):
    id            = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    rocketName    = models.CharField(max_length=100, blank = False)
    user          = models.ForeignKey(User, default = '', blank = False, on_delete=models.CASCADE)
    className     = models.ForeignKey('Class', default = '', blank = False, on_delete = models.CASCADE, related_name='rocketClasses')
    question2d    = models.ForeignKey('Question2d', null=True, blank = True, on_delete = models.CASCADE, related_name='rocketquestion2d')
    question2w    = models.ForeignKey('Question2w', null=True, blank = True, on_delete = models.CASCADE, related_name='rocketquestion2w')
    question2m    = models.ForeignKey('Question2m', null=True, blank = True, on_delete = models.CASCADE, related_name='rocketquestion2m')
    created_at    = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)
    
    def __str__(self):
        return f'{self.rocketName}'

    class Meta:
        db_table            = 'Rockets'
        verbose_name_plural = 'rockets'

class Question2D(models.Model):
    id                = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    className         = models.ForeignKey('Class', default = '', blank = False, on_delete = models.CASCADE, related_name='question2dClass')
    rocketName        = models.ForeignKey('Rocket', default = '', blank = False, on_delete = models.CASCADE, related_name='question2dRocket')    
    day2QuestionName  = models.CharField(max_length=100, blank = False)
    day2ReviewText    = models.CharField(max_length=512, blank = False)
    day2QuestionText  = models.CharField(max_length=512, blank = False)
    day2AnswerA       = models.CharField(max_length=50, blank = False)       
    day2AnswerB       = models.CharField(max_length=50, blank = False)       
    day2AnswerC       = models.CharField(max_length=50, blank = False)       
    day2AnswerD       = models.CharField(max_length=50, blank = False)
    day2CorrectAnswer = models.CharField(max_length=50, blank = False)
    url               = models.CharField(max_length=100, null = True, blank = True)
    emailTitle        = models.CharField(max_length=100, null = True, blank = True)
    emailMessage      = models.CharField(max_length=512, null = True, blank = True)
    send_at           = models.CharField(max_length = 1024, null = True, blank = True)
    created_at        = models.DateTimeField(auto_now_add = True)
    last_modified     = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f'{self.day2QuestionName}'

    class Meta:
        db_table            = 'Questions2d'
        verbose_name_plural = 'questions2d'

class Question2W(models.Model):
    id                 = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    className          = models.ForeignKey('Class', default = '', blank = False, on_delete = models.CASCADE, related_name='question2wClass')
    rocketName         = models.ForeignKey('Rocket', default = '', blank = False, on_delete = models.CASCADE, related_name='question2wRocket')    
    week2QuestionName  = models.CharField(max_length=100, blank = False)
    week2ReviewText    = models.CharField(max_length=512, blank = False)
    week2QuestionText  = models.CharField(max_length=512, blank = False)
    week2AnswerA       = models.CharField(max_length=50, blank = False)       
    week2AnswerB       = models.CharField(max_length=50, blank = False)       
    week2AnswerC       = models.CharField(max_length=50, blank = False)       
    week2AnswerD       = models.CharField(max_length=50, blank = False)
    week2CorrectAnswer = models.CharField(max_length=50, blank = False)   
    url                = models.CharField(max_length=100, null = True, blank = True) 
    emailTitle         = models.CharField(max_length=100, null = True, blank = True)
    emailMessage       = models.CharField(max_length=512, null = True, blank = True)    
    send_at            = models.CharField(max_length = 1024, null = True, blank = True)
    created_at         = models.DateTimeField(auto_now_add = True)
    last_modified      = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f'{self.week2QuestionName}'

    class Meta:
        db_table            = 'Questions2w'
        verbose_name_plural = 'questions2w'

class Question2M(models.Model):
    id                  = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    className           = models.ForeignKey('Class', default = '', blank = False, on_delete = models.CASCADE, related_name='question2mClass')
    rocketName          = models.ForeignKey('Rocket', default = '', blank = False, on_delete = models.CASCADE, related_name='question2mRocket')    
    month2QuestionName  = models.CharField(max_length=100, blank = False)
    month2ReviewText    = models.CharField(max_length=512, blank = False)
    month2QuestionText  = models.CharField(max_length=512, blank = False)
    month2AnswerA       = models.CharField(max_length=50, blank = False)       
    month2AnswerB       = models.CharField(max_length=50, blank = False)       
    month2AnswerC       = models.CharField(max_length=50, blank = False)       
    month2AnswerD       = models.CharField(max_length=50, blank = False)
    month2CorrectAnswer = models.CharField(max_length=50, blank = False)  
    url                 = models.CharField(max_length=100, null = True, blank = True) 
    emailTitle          = models.CharField(max_length=100, null = True, blank = True)
    emailMessage        = models.CharField(max_length=512, null = True, blank = True)          
    send_at             = models.CharField(max_length = 1024, null = True, blank = True)
    created_at          = models.DateTimeField(auto_now_add = True)
    last_modified       = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f'{self.month2QuestionName}'

    class Meta:
        db_table            = 'Questions2m'
        verbose_name_plural = 'questions2m'


class Student(models.Model):
    id            = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    studentName   = models.CharField(max_length=100, blank=False, default = '')
    teacher       = models.ForeignKey(User, default = '', blank = False, on_delete=models.CASCADE)
    studentEmail  = models.CharField(max_length=256, blank=False)
    className     = models.ForeignKey('Class', default = '', blank = False, on_delete = models.CASCADE, related_name='studentClasses' )
    created_at    = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.studentName}'

    class Meta:
        db_table            = 'Students'
        verbose_name_plural = 'students'
