from rest_framework import serializers, viewsets, generics, permissions, status
from django.db import IntegrityError
from django.http import JsonResponse
from .models import Rocket, Class, Question2D, Question2M, Question2W, Student
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings
from rocketsapp.utilities.billing_helper import SubscribeCustomer
from django.core.mail import EmailMessage
from .serializers import ClassSerializer,  UpdateClassSerializer, StudentSerializer, \
                        UpdateStudentSerializer, RocketSerializer, UpdateRocketSerializer, \
                        UpdateQuestion2DSerializer, GetQuestionSerializer, UpdateQuestion2WSerializer, \
                        UpdateQuestion2WSerializer, UpdateQuestion2MSerializer, SubscriptionSerializer, \
                        EmailSerializer, GetRocketSerializer

jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER
import json

class RegisterClasses(generics.CreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = (permissions.IsAuthenticated,
    ) #takes the authorization header and decodes it to provide access to the gated route
 
    def post(self, request, *args, **kwargs):
        username = request.user #This sets the username to request.user which was provided by the token which was authenticated prior to getting to this point in the code.
        premiumCheck = request.user.is_premium
        className = request.data.get("className") #this retrieves the data sent via the request (from the client) and allows it to be accessed by the backend.
        if (premiumCheck is False):
            count = Class.objects.filter(user = username).count()
            if(count >= 10):
                return JsonResponse({ 
                    'error': 'Class count has exceeded 10, you will need a premium account to or delete exisiting classes to continue.'
                    },
                    safe = True,
                    status = status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            else:
                pass

        if(Class.objects.filter(className = className)):
            response = JsonResponse({
                    'error': 'class already exists'
                },
                safe=True,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            return response
        else:
            Class( 
                className = className, 
                user = username 
                ).save() #accesses the desired model and creates a new object based on the passed in variables and specific model
            response = JsonResponse({
                    'msg': 'class creation successful'
                },
                safe=True,
                status=status.HTTP_201_CREATED
            )
            return response

class UpdateClass(generics.CreateAPIView):
    serializer_class = UpdateClassSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post (self, request):
        username = request.user
        newClassName = request.data.get("newClassName") 
        oldClassName = request.data.get("oldClassName") 

        Class.objects.filter(className = oldClassName).update(
            className = newClassName
        )
        response = JsonResponse({
            'msg': 'class update successful'
            },
            safe=True,
            status=status.HTTP_200_OK
        )
        return response      
        
class RegisterStudents(generics.CreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated,) #takes the authorization header and decodes it to provide access to the gated route
 
    def post(self, request, *args, **kwargs):
        username = request.user #This sets the username to request.user which was provided by the token which was authenticated prior to getting to this point in the code.
        className = request.data.get("className") #this retrieves the data sent via the request (from the client) and allows it to be accessed by the backend.
        studentName = request.data.get("studentName")
        studentEmail = request.data.get("studentEmail")
        className = Class.objects.get(className = className) #Searches class table to find matching class name then sets it to variable, which is then applied to Rocket.save()

        Student( 
            studentName = studentName,
            studentEmail = studentEmail,
            className = className, 
            teacher = username 
            ).save() #accesses the desired model and creates a new object based on the passed in variables and specific model

        response = JsonResponse({
                'msg': 'student creation successful'
            },
            safe=True,
            status=status.HTTP_201_CREATED
        )
        return response

class GetStudents(generics.CreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        className = request.data.get("className")
        rocketClass = Class.objects.get(className = className)
        students = list(Student.objects.filter(className = rocketClass).values("studentName", "studentEmail"))
        response =  JsonResponse(students, safe = False, status = status.HTTP_200_OK)
        return response

class UpdateStudent(generics.CreateAPIView):
    serializer_class = UpdateStudentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        className = request.data.get("className")
        oldStudentName = request.data.get('oldStudentName')
        newStudentName = request.data.get('newStudentName')
        newStudentEmail = request.data.get('newStudentEmail')

        currentClass = Class.objects.get(className = className)
        
        if (newStudentName and not newStudentEmail):
            Student.objects.filter(className = currentClass).filter(studentName = oldStudentName).update(
            studentName = newStudentName
            )

        if (newStudentEmail and not newStudentName):
            Student.objects.filter(className = currentClass).filter(studentName = oldStudentName).update(
            studentEmail = newStudentEmail
            )

        if (newStudentName and newStudentEmail):
            Student.objects.filter(className = currentClass).filter(studentName = oldStudentName).update(
            studentEmail = newStudentEmail,
            studentName = newStudentName
            )
        response = JsonResponse({
            'msg': 'update successful'
            },
            safe=True,
            status=status.HTTP_200_OK
        )
        return response

class RemoveClass(generics.CreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        className = request.data.get("className")
        classDelete = Class.objects.get(className = className).delete()

        return JsonResponse({
            'msg': 'class removed successfully'
        },
            safe = True,
            status=status.HTTP_200_OK
        )

class RemoveStudent(generics.CreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        className = request.data.get("className")
        currentClass = Class.objects.get(className = className)
        studentName = request.data.get("studentName")
        studentEmail = request.data.get("studentEmail")
        user = request.user
        
        student = Student.objects.filter(className=currentClass, 
                                         teacher=user,
                                         studentName=studentName,
                                         studentEmail=studentEmail
                                        ).first()

        if not student:
            return JsonResponse({
                'msg': 'student not found'
            },
            safe=True,
            status=status.HTTP_400_BAD_REQUEST
        )

        student.delete()
        
        return JsonResponse({
                'msg': 'student removed successfully'
            },
            safe=True,
            status=status.HTTP_200_OK
        )

class RemoveRocket(generics.CreateAPIView):
    serializer_class = GetRocketSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        className = request.data.get("className")
        rocketName = request.data.get("rocketName")
        className = Class.objects.get(className = className) 
        rocket = Rocket.objects.filter(className = className).filter(rocketName = rocketName).delete()
        
        return JsonResponse({
                'msg': 'rocket removed successfully'
            },
            safe=True,
            status=status.HTTP_200_OK
        )

class RegisterRockets(generics.CreateAPIView):
    serializer_class = RocketSerializer
    permission_classes = (permissions.IsAuthenticated,)
 
    def post(self, request, *args, **kwargs):

        username = request.user
        premiumCheck = request.user.is_premium
        rocketName = request.data.get("rocketName")
        className = request.data.get("className")

        day2QuestionName = request.data.get("day2QuestionName")
        day2ReviewText = request.data.get("day2ReviewText")
        day2QuestionText = request.data.get("day2QuestionText")
        day2AnswerA = request.data.get("day2AnswerA")
        day2AnswerB = request.data.get("day2AnswerB")
        day2AnswerC = request.data.get("day2AnswerC")
        day2AnswerD = request.data.get("day2AnswerD")
        day2CorrectAnswer = request.data.get("day2CorrectAnswer")

        week2QuestionName = request.data.get("week2QuestionName")
        week2ReviewText = request.data.get("week2ReviewText")
        week2QuestionText = request.data.get("week2QuestionText")
        week2AnswerA = request.data.get("week2AnswerA")
        week2AnswerB = request.data.get("week2AnswerB")
        week2AnswerC = request.data.get("week2AnswerC")
        week2AnswerD = request.data.get("week2AnswerD")
        week2CorrectAnswer = request.data.get("week2CorrectAnswer")

        month2QuestionName = request.data.get("month2QuestionName")
        month2ReviewText = request.data.get("month2ReviewText")
        month2QuestionText = request.data.get("month2QuestionText")
        month2AnswerA = request.data.get("month2AnswerA")
        month2AnswerB = request.data.get("month2AnswerB")
        month2AnswerC = request.data.get("month2AnswerC")
        month2AnswerD = request.data.get("month2AnswerD")
        month2CorrectAnswer = request.data.get("month2CorrectAnswer")

        className = Class.objects.get(className = className) #Searches class table to find matching class name then sets it to variable, which is then applied to Rocket.save()
        rocketCheck = Rocket.objects.filter(rocketName = rocketName).filter(className = className)
        if (premiumCheck is False):
            count = Rocket.objects.filter(user = username).count()
            if(count >= 10):
                return JsonResponse({ 
                    'error': 'Rocket count has exceeded 10, you will need a premium account or delete existing rockets to continue.'
                    },
                    safe = True,
                    status = status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            else:
                pass

        if (rocketCheck):
            return JsonResponse({ 
                'error': 'A rocket for this class already exists'
                },
                safe = True,
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        else:
            try:
                Rocket(
                    rocketName = rocketName, 
                    className = className, 
                    user = username, 
                ).save()
                rocket = Rocket.objects.filter(rocketName = rocketName).get(className = className)
                Question2D(
                    className = className,
                    rocketName = rocket,
                    day2QuestionName = day2QuestionName,
                    day2ReviewText = day2ReviewText,
                    day2QuestionText = day2QuestionText,
                    day2AnswerA = day2AnswerA,
                    day2AnswerB = day2AnswerB,
                    day2AnswerC = day2AnswerC,
                    day2AnswerD = day2AnswerD,
                    day2CorrectAnswer = day2CorrectAnswer
                ).save()
                Question2W(
                    className = className,
                    rocketName = rocket,
                    week2QuestionName = week2QuestionName,
                    week2ReviewText = week2ReviewText,
                    week2QuestionText = week2QuestionText,
                    week2AnswerA = week2AnswerA,
                    week2AnswerB = week2AnswerB,
                    week2AnswerC = week2AnswerC,
                    week2AnswerD = week2AnswerD,
                    week2CorrectAnswer = week2CorrectAnswer
                ).save()
                Question2M(
                    className = className,
                    rocketName = rocket,
                    month2QuestionName = month2QuestionName,
                    month2ReviewText = month2ReviewText,
                    month2QuestionText = month2QuestionText,
                    month2AnswerA = month2AnswerA,
                    month2AnswerB = month2AnswerB,
                    month2AnswerC = month2AnswerC,
                    month2AnswerD = month2AnswerD,
                    month2CorrectAnswer = month2CorrectAnswer
                ).save()
                question2d = Question2D.objects.get(rocketName = rocket, className = className, day2QuestionName = day2QuestionName)
                question2w = Question2W.objects.get(rocketName = rocket, className = className, week2QuestionName = week2QuestionName)
                question2m = Question2M.objects.get(rocketName = rocket, className = className, month2QuestionName = month2QuestionName)
                Rocket.objects.filter(rocketName = rocketName).filter(className = className).update(
                    question2d = question2d, 
                    question2w = question2w, 
                    question2m = question2m, 
                )
                response = JsonResponse({
                        'msg': 'successful'
                    },
                    safe=True,
                    status=status.HTTP_201_CREATED
                )                

            except IntegrityError:
                Rocket.objects.filter(rocketName = rocketName).delete()
                return JsonResponse({ 
                    'error': 'Error, There were some'
                    },
                    safe = True,
                    status = status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            return response

class UpdateRocket(generics.CreateAPIView):
    serializer_class = UpdateRocketSerializer
    permission_classes = (permissions.IsAuthenticated,)
 
    def post(self, request, *args, **kwargs):

        oldRocketName = request.data.get("oldRocketName")
        newRocketName = request.data.get("newRocketName")
        oldClassName = request.data.get("oldClassName")
        newClassName = request.data.get("newClassName")

        updateClass = Class.objects.get(className = newClassName)

        if(newRocketName and not newClassName):
            Rocket.objects.filter(rocketName = oldRocketName).update(
                rocketName = newRocketName
            )

        if(newClassName and not newRocketName):
            Rocket.objects.filter(rocketName = oldRocketName).update(
                className = updateClass
            )

        if(newRocketName and newClassName):
            Rocket.objects.filter(rocketName = oldRocketName).update(
                rocketName = newRocketName,
                className = updateClass
            )
            
        response = JsonResponse({
                'msg': 'update successful'
            },
            safe=True,
            status=status.HTTP_200_OK
        )    

        return response

class UpdateQuestion2D(generics.CreateAPIView):
    serializer_class = UpdateQuestion2DSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        className = request.data.get("className")
        oldDay2QuestionName = request.data.get("oldDay2QuestionName")
        newDay2QuestionName = request.data.get("newDay2QuestionName")
        day2ReviewText = request.data.get("day2ReviewText")
        day2QuestionText = request.data.get("day2QuestionText")
        day2AnswerA = request.data.get("day2AnswerA")
        day2AnswerB = request.data.get("day2AnswerB")
        day2AnswerC = request.data.get("day2AnswerC")
        day2AnswerD = request.data.get("day2AnswerD")
        day2CorrectAnswer = request.data.get("day2CorrectAnswer")

        queryClass = Class.filter.get(className = className)

        Question2D.objects.filter(day2QuestionName = oldDay2QuestionName).filter(className=queryClass).update(
            day2QuestionName = newDay2QuestionName,
            day2ReviewText = day2ReviewText,
            day2QuestionText = day2QuestionText,
            day2AnswerA = day2AnswerA,
            day2AnswerB = day2AnswerB,
            day2AnswerC = day2AnswerC,
            day2AnswerD = day2AnswerD,
            day2CorrectAnswer = day2CorrectAnswer
        )
        response = JsonResponse({
                'msg': 'update successful'
            },
            safe=True,
            status=status.HTTP_200_OK
        )    

        return response

class GetQuestion2D(generics.CreateAPIView):
    serializer_class = GetQuestionSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        rocketName = request.data.get("rocketName")
        className = request.data.get("className")
        classQuery = Class.objects.get(className = className)
        rocketQuery = Rocket.objects.get(className = classQuery, rocketName = rocketName)
        questionName = Question2D.objects.get(className = classQuery, rocketName = rocketQuery)
        question = list(Question2D.objects.filter(rocketName = rocketQuery, className = classQuery, day2QuestionName = str(questionName)).values("day2ReviewText","day2QuestionText","day2AnswerA","day2AnswerB","day2AnswerC","day2AnswerD","day2CorrectAnswer"))
        response = JsonResponse({
            "class": className,
            "rocket": rocketName,
            "question": question
            })
        return response

class UpdateQuestion2W(generics.CreateAPIView):
    serializer_class = UpdateQuestion2WSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        oldWeek2QuestionName = request.data.get("oldWeek2QuestionName")
        newWeek2QuestionName = request.data.get("newWeek2QuestionName")
        week2ReviewText = request.data.get("week2ReviewText")
        week2QuestionText = request.data.get("week2QuestionText")
        week2AnswerA = request.data.get("week2AnswerA")
        week2AnswerB = request.data.get("week2AnswerB")
        week2AnswerC = request.data.get("week2AnswerC")
        week2AnswerD = request.data.get("week2AnswerD")
        week2CorrectAnswer = request.data.get("week2CorrectAnswer")

        Question2W.objects.filter(week2QuestionName = oldWeek2QuestionName).update(
            week2QuestionName = newWeek2QuestionName,
            week2ReviewText = week2ReviewText,
            week2QuestionText = week2QuestionText,
            week2AnswerA = week2AnswerA,
            week2AnswerB = week2AnswerB,
            week2AnswerC = week2AnswerC,
            week2AnswerD = week2AnswerD,
            week2CorrectAnswer = week2CorrectAnswer
        )
        response = JsonResponse({
                'msg': 'update successful'
            },
            safe=True,
            status=status.HTTP_200_OK
        )    

        return response

class GetQuestion2W(generics.CreateAPIView):
    serializer_class = GetQuestionSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        rocketName = request.data.get("rocketName")
        className = request.data.get("className")
        classQuery = Class.objects.get(className = className)
        rocketQuery = Rocket.objects.get(className = classQuery, rocketName = rocketName)
        questionName = Question2W.objects.get(className = classQuery, rocketName = rocketQuery)
        question = list(Question2W.objects.filter(rocketName = rocketQuery, className = classQuery, week2QuestionName = str(questionName)).values("week2ReviewText","week2QuestionText","week2AnswerA","week2AnswerB","week2AnswerC","week2AnswerD","week2CorrectAnswer"))
        response = JsonResponse({
            "class": className,
            "rocket": rocketName,
            "question": question
            })
        return response

class UpdateQuestion2M(generics.CreateAPIView):
    serializer_class = UpdateQuestion2MSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        oldMonth2QuestionName = request.data.get("oldMonth2QuestionName")
        newMonth2QuestionName = request.data.get("newMonth2QuestionName")
        month2ReviewText = request.data.get("month2ReviewText")
        month2QuestionText = request.data.get("month2QuestionText")
        month2AnswerA = request.data.get("month2AnswerA")
        month2AnswerB = request.data.get("month2AnswerB")
        month2AnswerC = request.data.get("month2AnswerC")
        month2AnswerD = request.data.get("month2AnswerD")
        month2CorrectAnswer = request.data.get("month2CorrectAnswer")

        Question2M.objects.filter(month2QuestionName = oldMonth2QuestionName).update(
            month2QuestionName = newMonth2QuestionName,
            month2ReviewText = month2ReviewText,
            month2QuestionText = month2QuestionText,
            month2AnswerA = month2AnswerA,
            month2AnswerB = month2AnswerB,
            month2AnswerC = month2AnswerC,
            month2AnswerD = month2AnswerD,
            month2CorrectAnswer = month2CorrectAnswer
        )
        response = JsonResponse({
                'msg': 'update successful'
            },
            safe=True,
            status=status.HTTP_200_OK
        )    

        return response

class GetQuestion2M(generics.CreateAPIView):
    serializer_class = GetQuestionSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        rocketName = request.data.get("rocketName")
        className = request.data.get("className")
        classQuery = Class.objects.get(className = className)
        rocketQuery = Rocket.objects.get(className = classQuery, rocketName = rocketName)
        questionName = Question2M.objects.get(className = classQuery, rocketName = rocketQuery)
        question = list(Question2M.objects.filter(rocketName = rocketQuery, className = classQuery, month2QuestionName = str(questionName)).values("month2ReviewText","month2QuestionText","month2AnswerA","month2AnswerB","month2AnswerC","month2AnswerD","month2CorrectAnswer"))
        response = JsonResponse({
            "class": className,
            "rocket": rocketName,
            "question": question
            })
        return response

class GetRockets(generics.CreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        username = request.user
        className = request.data.get("className")
        className = Class.objects.get(className = className)
        rockets = Rocket.objects.filter(user = username)
        rocket_list = list(Rocket.objects.filter(className = className).values("rocketName"))
        for rocket in rocket_list:
            rocket["className"] = str(className)

        return JsonResponse(rocket_list, safe=False)

class IsPremium(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION').split()[1]
    
        try:
            payload = jwt_decode_handler(token)
        except jwt.ExpiredSignature:
            msg = _('Signature has expired.')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = _('Error decoding signature.')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed()

        response = JsonResponse(json.dumps({
                    "is_premium": f'{request.user.is_premium}'
                }),
                safe=False,
                status=status.HTTP_200_OK
            )

        return response

class CreateSubscription(generics.CreateAPIView):
    serializer_class = SubscriptionSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION').split()[1]
        source = request.data.get("source")
        
        try:
            payload = jwt_decode_handler(token)
        except jwt.ExpiredSignature:
            msg = _('Signature has expired.')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = _('Error decoding signature.')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed()
        
        subCustomer = SubscribeCustomer(payload['username'], payload['email'], source)

        customer_exists = subCustomer.customer_exists()
        if (customer_exists):
            response = JsonResponse(json.dumps({
                    "msg": "customer already has subscription."
                }),
                safe=False,
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            subCustomer.create_customer()
            subCustomer.create_subscription()
            subCustomer.update_teacher()

            response = JsonResponse(json.dumps({
                    "msg": "customer subscribed successfully."
                }),
                safe=False,
                status=status.HTTP_201_CREATED
            )
        
        return response

class GetRocketsByClassName(generics.CreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user = request.user
        className = request.data.get('className')
        clss = Class.objects.get(className=className)
        rockets = Rocket.objects.filter(user=user, className=clss)
        rocket_list = []
        for rocket in rockets:
            rocket_list.append({ 'rocketname': rocket.rocketName })

        return JsonResponse(rocket_list, safe=False)

class GetClasses(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        username = request.user
        classList = list(Class.objects.filter(user=username).values("className"))
        return JsonResponse( classList, safe=False, status=status.HTTP_200_OK )

class BuildEmail(generics.CreateAPIView):
    serializer_class = EmailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        teacherEmail = request.user.email
        url = request.data.get("url")
        title = request.data.get("title")
        message = request.data.get("message")
        className = request.data.get("className")

        ## To be used when implementing server side programmatic email sending

        # rocketName = request.data.get("rocketName")
        # interval = request.data.get("interval")
        # unixTimeStamp = request.data.get('unixTimeStamp')
        # className = Class.objects.get(className = className)
        # rocketName = Rocket.objects.get(className = className, rocketName = rocketName)
        # if (interval == "quiz2d"):
        #     Question2D.objects.filter(className = className, rocketName = rocketName).update(
        #         url = url,
        #         emailTitle = title,
        #         emailMessage = message,
        #         send_at = unixTimeStamp
        #     )
        #     return JsonResponse( {"message": "Email batch sent successfully... at least there weren't any server errors..."}, safe=False, status=status.HTTP_200_OK )

        # elif (interval == "quiz2w"):
        #     Question2W.objects.filter(className = className, rocketName = rocketName).update(
        #         url = url,
        #         emailTitle = title,
        #         emailMessage = message,
        #         send_at = unixTimeStamp
        #     )
        #     return JsonResponse( {"message": "Email batch sent successfully... at least there weren't any server errors..."}, safe=False, status=status.HTTP_200_OK )

        # elif (interval == "quiz2m"):
        #     Question2M.objects.filter(className = className, rocketName = rocketName).update(
        #         url = url,
        #         emailTitle = title,
        #         emailMessage = message,
        #         send_at = unixTimeStamp
        #     )
        #     return JsonResponse( {"message": "Email batch sent successfully... at least there weren't any server errors..."}, safe=False, status=status.HTTP_200_OK )

        # else:
        #     return JsonResponse( {"error": "error processing your request"}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        className = Class.objects.get(className = className)
        studentList = list(Student.objects.filter(className = className).values_list("studentEmail", flat=True))
        if(studentList):

            emailBatch = EmailMessage(
                f'{title}',
                f'{message} \n Please copy and paste the following URL into your browser to access your quiz: \n {url}',
                f'{teacherEmail}',
                to=studentList,
            )
            emailBatch.send(fail_silently=False)

            return JsonResponse( {"message": "Email batch sent successfully... at least there weren't any server errors..."}, safe=False, status=status.HTTP_200_OK )

        else:
            return JsonResponse( {"error": "Need a list of students to send emails to"}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)