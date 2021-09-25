from rest_framework import serializers

class ClassSerializer(serializers.Serializer):
    className = serializers.CharField(max_length=100)

class GetRocketSerializer(serializers.Serializer):
    rocketName: serializers.CharField(max_length=100)
    className = serializers.CharField(max_length=100)

class UpdateClassSerializer(serializers.Serializer):
    newClassName = serializers.CharField(max_length=100)
    oldClassName = serializers.CharField(max_length=100)
    
class StudentSerializer(serializers.Serializer):
    studentName = serializers.CharField(max_length=100)
    studentEmail = serializers.CharField(max_length=256)
    className = serializers.CharField(max_length=100)

class UpdateStudentSerializer(serializers.Serializer):
    oldStudentName = serializers.CharField(max_length=100)
    newStudentName = serializers.CharField(max_length=100, required = False)
    newStudentEmail = serializers.CharField(max_length=256, required = False)
    className = serializers.CharField(max_length=100)

class RocketSerializer(serializers.Serializer):
    rocketName = serializers.CharField(max_length=100)
    className = serializers.CharField(max_length=100)
    
    day2QuestionName = serializers.CharField(max_length=100)
    day2ReviewText = serializers.CharField(max_length=512)
    day2QuestionText = serializers.CharField(max_length=512)
    day2AnswerA = serializers.CharField(max_length=50)
    day2AnswerB = serializers.CharField(max_length=50)
    day2AnswerC = serializers.CharField(max_length=50)
    day2AnswerD = serializers.CharField(max_length=50)
    day2CorrectAnswer = serializers.CharField(max_length=50)

    week2QuestionName = serializers.CharField(max_length=100)
    week2ReviewText = serializers.CharField(max_length=512)
    week2QuestionText = serializers.CharField(max_length=512)
    week2AnswerA = serializers.CharField(max_length=50)
    week2AnswerB = serializers.CharField(max_length=50)
    week2AnswerC = serializers.CharField(max_length=50)
    week2AnswerD = serializers.CharField(max_length=50)
    week2CorrectAnswer = serializers.CharField(max_length=50)

    month2QuestionName = serializers.CharField(max_length=100)
    month2ReviewText = serializers.CharField(max_length=512)
    month2QuestionText = serializers.CharField(max_length=512)
    month2AnswerA = serializers.CharField(max_length=50)
    month2AnswerB = serializers.CharField(max_length=50)
    month2AnswerC = serializers.CharField(max_length=50)
    month2AnswerD = serializers.CharField(max_length=50)
    month2CorrectAnswer = serializers.CharField(max_length=50)

class UpdateRocketSerializer(serializers.Serializer):
    oldRocketName = serializers.CharField(max_length=100)
    newRocketName = serializers.CharField(required = False, max_length=100)
    oldClassName = serializers.CharField(max_length=100)
    newClassName = serializers.CharField(required = False, max_length=100)
    
class UpdateQuestion2DSerializer(serializers.Serializer):
    className = serializers.CharField(max_length=100)
    oldDay2QuestionName = serializers.CharField(max_length=100)
    newDay2QuestionName = serializers.CharField(required = False, max_length=100)

    day2ReviewText = serializers.CharField(required = False, max_length=512)
    day2QuestionText = serializers.CharField(required = False, max_length=512)
    day2AnswerA = serializers.CharField(required = False, max_length=50)
    day2AnswerB = serializers.CharField(required = False, max_length=50)
    day2AnswerC = serializers.CharField(required = False, max_length=50)
    day2AnswerD = serializers.CharField(required = False, max_length=50)
    day2CorrectAnswer = serializers.CharField(required = False, max_length=50)

class GetQuestionSerializer(serializers.Serializer):
    className = serializers.CharField(max_length=100)
    rocketName = serializers.CharField(max_length=100)

class UpdateQuestion2WSerializer(serializers.Serializer):
    className = serializers.CharField(max_length=100)
    oldWeek2QuestionName = serializers.CharField( max_length=100)
    newWeek2QuestionName = serializers.CharField(required = False, max_length=100)

    week2ReviewText = serializers.CharField(required = False, max_length=512)
    week2QuestionText = serializers.CharField(required = False, max_length=512)
    week2AnswerA = serializers.CharField(required = False, max_length=50)
    week2AnswerB = serializers.CharField(required = False, max_length=50)
    week2AnswerC = serializers.CharField(required = False, max_length=50)
    week2AnswerD = serializers.CharField(required = False, max_length=50)
    week2CorrectAnswer = serializers.CharField(required = False, max_length=50)

class UpdateQuestion2MSerializer(serializers.Serializer):
    className = serializers.CharField(max_length=100)
    newMonth2QuestionName = serializers.CharField(max_length=100)
    oldMonth2QuestionName = serializers.CharField(required = False, max_length=100)

    month2ReviewText = serializers.CharField(required = False, max_length=512)
    month2QuestionText = serializers.CharField(required = False, max_length=512)
    month2AnswerA = serializers.CharField(required = False, max_length=50)
    month2AnswerB = serializers.CharField(required = False, max_length=50)
    month2AnswerC = serializers.CharField(required = False, max_length=50)
    month2AnswerD = serializers.CharField(required = False, max_length=50)
    month2CorrectAnswer = serializers.CharField(required = False, max_length=50)

class SubscriptionSerializer(serializers.Serializer):
    source = serializers.CharField(max_length=256)

class EmailSerializer(serializers.Serializer):
    url = serializers.CharField(max_length=256)
    className = serializers.CharField(max_length=100)
    rocketName = serializers.CharField(max_length=100)
    interval = serializers.CharField(max_length=100)
    message = serializers.CharField(max_length=512)
    title = serializers.CharField(max_length=100)
    unixTimeStamp = serializers.DateTimeField(input_formats=['%d'])
