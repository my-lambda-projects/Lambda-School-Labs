# To be used when server side programatic email sending implemented
# 
# from django.core.mail import EmailMessage
# from models import Rocket, Class, Question2D, Question2M, Question2W, Student
# from django.contrib.auth.models import User

# questions = Question2D.objects.get.all()
# for question in questions:
#     if UnixDateTime.now() < question.send_at >  UnixDateTime.now() + 86400:
#         className = Class.objects.get(className = className)
#         user = className.user
#         studentList = list(Student.objects.filter(className = className).values_list("studentEmail", flat=True))
#         emailBatch = EmailMessage(
#                 f'{question.emailTitle}',
#                 f'{quesiton.emailMessage} \n {url}',
#                 f'{user.email}',
#                 to=studentList,
#             )
#             emailBatch.send(fail_silently=False)
#     continue

