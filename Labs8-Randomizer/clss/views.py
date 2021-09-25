from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import ClssName, StudentName, Participation
from django.core.exceptions import ValidationError
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def createClass(request):
    data = json.loads(request.body)
    name_of_class = data['class_name']
    user = request.user
    newClass2 = ClssName.manager.create_class(user,name_of_class)
    newClass2.save()
    response = JsonResponse({'id':str(newClass2.id)}, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def listClass(request):
    user = request.user
    classlist = ClssName.manager.filter(teacher=user) #returns a QuerySet
    #now need to iterate through query set passing names into an array
    justnames = []
    for x in classlist:
        justnames.append({'className':x.class_name,'classID':str(x.id)})
    response = JsonResponse({'names' : justnames}, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def getEverything(request):
    user = request.user
    classlist = ClssName.manager.filter(teacher=user) #returns a QuerySet
    #now need to iterate through query set passing names into an array
    clssSummary = []
    for x in classlist:
        studentlist = StudentName.objects.filter(enrolled=x.id)
        students = []
        for y in studentlist:
            sParticipations = Participation.manager.filter(student=y.id)
            pDicT = {'P':0, 'NP':0}
            for z in sParticipations:
                if z.participate == True:
                    pDicT['P'] = pDicT['P'] + 1
                else:
                    pDicT['NP'] = pDicT['NP'] + 1
            studentInfo = {'studentName':y.student_name_first+' '+y.student_name_last, 'participation': pDicT}
            students.append(studentInfo)
        clssSummary.append({'className':x.class_name,'classID':str(x.id), 'studentsInfo': students})
    response = JsonResponse({'clss': clssSummary}, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def csv_post(request):
    user = request.user
    data=json.loads(request.body)
    studentArray = data['studentArray']
    print('studentArray', studentArray)
    newClass = ClssName.manager.create_class(user,data['class_name'])
    newClass.save()
    studentNameArray = []
    #if class name is first entry of array
    for i, student in enumerate(studentArray[1:len(studentArray)-1]):
        s = student.split()
        print(s)
        newStudent = StudentName.objects.create_student(newClass,s[0],s[1])
        newStudent.save()
        studentNameArray.append({'fullName':newStudent.student_name_first+' '+newStudent.student_name_last, 'studentID':str(newStudent.id)})
    obj = {'classID':str(newClass.id), 'studentArray': studentNameArray}
    response = JsonResponse(obj, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def createStudent(request):
    data = json.loads(request.body)
    clssID = data['classID']
    first = data['firstName']
    last = data['lastName']
    course = ClssName.manager.get(id=clssID)
    newStudent = StudentName.objects.create_student(course,first,last)
    newStudent.save()
    response = JsonResponse({'key':str(newStudent.id)}, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def studentList(request):
    data = json.loads(request.body)
    clssID = data['classID']
    course = ClssName.manager.get(id=clssID)
    class_name = course.class_name
    classlist = StudentName.objects.filter(enrolled=clssID) #returns a QuerySet
    studentNames = []
    for x in classlist:
        studentNames.append({'fullName':x.student_name_first+' '+x.student_name_last, 'studentID':str(x.id)})
    obj = {'class_name': class_name, 'studentNames':studentNames}
    response = JsonResponse(obj, safe=True, status=201)
    print(response)
    return response

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def createParticipation(request):
    data = json.loads(request.body)
    boo = data['particpated'] #value of true or false
    studentID = data['studentID']
    student = StudentName.objects.get(id=studentID)
    participating = Participation.manager.create_participation(student,boo)
    participating.save()
    response = JsonResponse({"key":str(participating.id)}, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def particpationTotal(request):
    data = json.loads(request.body)
    studentID = data['studentID']
    allParticipations = Participation.manager.filter(student=studentID)
    print(allParticipations)
    participationDictionary = {}
    for x in allParticipations:
        splitDate = str(x.date).split()
        if splitDate[0] not in participationDictionary:
            participationDictionary[splitDate[0]] = {'P':0, 'NP':0}
        if x.participate == True:
            dicT = participationDictionary[splitDate[0]]
            dicT['P'] = dicT['P'] + 1
        else:
            dicT = participationDictionary[splitDate[0]]
            dicT['NP'] = dicT['NP']+ 1
    response = JsonResponse(participationDictionary, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def updateClass(request):
    data = json.loads(request.body)
    class_new = data['class_name']
    classID = data['classID']
    class_update = ClssName.manager.get(id=classID)
    class_update.class_name = class_new
    class_update.save()
    response = JsonResponse({'key':class_update.id}, safe=True, status=201)
    return response


@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def updateStudent(request):
    data = json.loads(request.body)
    student_new_first = data['student_name_first']
    student_new_last = data['student_name_last']
    studentID = data['studentID']
    student = StudentName.objects.get(id=studentID)
    student.student_name_first = student_new_first
    student.student_name_last = student_new_last
    student.save()
    response = JsonResponse({'key':student.id}, safe=True, status=201)
    return response

@csrf_exempt
@api_view(["DELETE"])
@permission_classes((permissions.AllowAny,))
def deleteStudent(request):
    data = json.loads(request.body)
    studentID = data['studentID']
    print(studentID)
    Participation.manager.filter(student=studentID).delete()
    student = StudentName.objects.get(id=studentID)
    print("student", student)
    student.delete()
    response = JsonResponse({'key': 'user has been remove'}, safe=True, status=200)
    return response

@csrf_exempt
@api_view(["DELETE"])
@permission_classes((permissions.AllowAny,))
def deleteClass(request):
    data = json.loads(request.body)
    classID = data['classID']
    clss = ClssName.manager.get(id=classID)
    clss.delete()
    response = JsonResponse({'key': 'This class has been removed.'}, safe=True, status=200)
    return response

