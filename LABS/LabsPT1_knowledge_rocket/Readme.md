# Knowledge Rocket
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Summary:
Knowledge Rocket is for teachers who wish to provide automated knowledge reminders for their students.

Students are registered by teachers and do not need or use accounts of their own.

Knowledge rockets are short paragraphs followed by a multiple choice question. These are automatically sent two days, two weeks, and two months after a lesson is taught and are intended to cause the student to recall what they have learned. The rockets should not be used to provide an exhaustive review. Instead, they ask the student to "reload" the mental maps the acquired during the lesson.

Link to online Application:
- [Knowledge Rocket](https://infallible-euler-24eb8a.netlify.com/)

## Contents:
- [Front End](#front-end)
- [Back End](#back-end)
- [DataBase](#data-base)
- [Server Host](#server-host)
- [Billing](#billing)
- [Notifications](#notify)
- [OAuth](#oauth)
- [Encryption](#encryption)
- [Team](#team-members)
- [License](#license)
- [EndPoints](#endpoints)
- [Running Front End](#running-front-end)
- [Running Back End](#running-back-end)
- [Environment Variables](#environment-variables)
- [Instructions](#instructions)

## Knowledge Rocket Stack:

## Front End:
- React/React-Dom | [Learn More](https://www.npmjs.com/package/react)
	- JS framework that utilizes JS and JSX to create single page applications.

- Redux | [Learn More](https://www.npmjs.com/package/redux)
	- React - addon to React that allows for app wide storage of data.

- React-Redux | [Learn More](https://www.npmjs.com/package/react-redux)
	- Connects React and Redux

- Axios | [Learn More](https://www.npmjs.com/package/axios)
	- HTTP framework that works with JS to send data between client and server

- React Router | [Learn More](https://www.npmjs.com/package/react-router)
	- React addon used to organize a project and simplify routing between 
	react "pages"

- Reactstrap/Bootstrap | [Reactstrap](https://www.npmjs.com/package/reactstrap) / [Bootstrap](https://www.npmjs.com/package/bootstrap)
	- Component styling providing by bootstrap and adapted to work with react library

- React-Datepicker | [Learn More](https://www.npmjs.com/package/react-datepicker/)
	- DatePick component for React

- React-Scripts | [Learn More](https://www.npmjs.com/package/react-scripts)
	- This package includes scripts and configuration used by Create React App.

- React-Stripe-Elements | [Learn More](https://www.npmjs.com/package/react-stripe-elements)
	- React components to utilize with stripe integration

- Styled-Components | [Learn More](https://www.npmjs.com/package/styled-components)
	- Out of the box styled components for React

**Dev Dependencies**
- Nodemon | [Learn More](https://www.npmjs.com/package/nodemon)
	- Allow for easy restarting of React application upon saving changes

- Redux-Logger | [Learn More](https://www.npmjs.com/package/redux-logger)
	- Redux middleware for viewing redux state before/during/action actions are executed

### Middleware:
- Redux-Thunk | [Learn More](https://www.npmjs.com/package/redux-thunk)

	- Adds a layer of abstraction to Redux Actions to make them more readable and callable via function.

## Back End:
- Django | [Learn More](https://www.djangoproject.com/)
	- Python Web Framework designed for rapid deployment of web applications, works well with Sqlite3

- Gunicorn | [Learn More](https://pypi.org/project/gunicorn/)
	- Used to support Django/Python deployment on Heroku; a Python WSGI HTTP Server for UNIX

- Psycopg2-binary | [Learn More](https://pypi.org/project/psycopg2-binary/)
	- PostgreSQL database adapter; allows the application to link up to the postgreSQL db supplied by Heroku

- Dj-database-url | [Learn More](https://pypi.org/project/dj-database-url/)
	- Package used to allow easy switching between local and deployed databases by changing the database based on environment variable which varies from deployed to local

- Python-decouple | [Learn More](https://pypi.org/project/python-decouple/)
	- Allows for masking and changing settings parameters without redeployment.

- Whitenoise | [Learn More](https://pypi.org/project/whitenoise/)
	- Allows for direct serving of static files without relying on additional services

- Djangorestframework | [Learn More](https://pypi.org/project/djangorestframework/)
	- Toolkit used for building Web APIs

- Django-rest-auth | [Learn More](https://pypi.org/project/django-rest-auth/)
	- Supplies REST API endpoints for Authentication and Registration

- Django-allauth | [Learn More](https://pypi.org/project/django-allauth/)
	- Part of our eventual attempt at oAuth, which was unsuccessful; this is a set of Django applications to assist in the registration, authentication and account management of 3rd party account authentication

- Django-heroku | [Learn More](https://pypi.org/project/django-heroku/)
	- Library of Django apps to assist in the deployment of Django server to Heroku

- Django-rest-api | [Learn More](https://pypi.org/project/django-rest-api/)
	- Django rest framework used to build API's

- Djangorestframework-jwt | [Learn More](https://pypi.org/project/djangorestframework-jwt/)
	- JSON Web Token Authentication support for Django REST Framework

- Django-cors-headers | [Learn More](https://pypi.org/project/django-cors-headers/)
	- Django App that adds CORS (Cross-Origin Resource Sharing) headers to responses.

- Django-oauth-toolkit | [Learn More](https://github.com/jazzband/django-oauth-toolkit)
	- Framework intended to provide oAuth support; oAuth integration was not completed
	
## Database:
- SQL lite3 | [Learn More](https://www.sqlite.org/about.html)
	- Heroku postgresql when deployed
	- Used to allow for relational database building to link complex data tables

## Server Host:
- Heroku | [Learn More](https://www.heroku.com/home)
	- Online hosting for backend server code

## Front End Host:
- Netlify | [Learn More](https://www.netlify.com/)
	- Online hosting for frontend server code

## Billing:
- Stripe | [Learn More](https://stripe.com/)
	- Billing API used to allow users to sign up for premium app features at a fee.

## Notifications:
- Sendgrid | [Learn More](https://sendgrid.com/)
	- Transactional Email API used to send emails programatically through the application

## Auth:
- JSON Web Token | [Learn More](https://jwt.io/)
	- Token based authentication, allows for secure transmission of encoded data to allow access to restricted resources

## Encryption:
- Bcrypt | [Learn More](https://pypi.org/project/bcrypt/)
	- Password hashing/encryption technology used to encrypt passwords stored by Django

## Team Members:
- [Lisa Canini](https://github.com/LisaCee)--Pacific Time Zone
- [Bhavik Ravani](https://github.com/ravb2019)--Eastern Time Zone
- [Jesse Reichel](https://github.com/KryoKorpz)--Pacific Time Zone
- [Alexis Reyes](https://github.com/AlexisReyes90)--Eastern Time Zone
- [Sean Valdivia](https://github.com/NewbieWanKenobi) --Central Time

## License:
Knowledge Rocket is [MIT licensed](https://opensource.org/licenses/MIT).

## Endpoints:

Be logged in for all but <br> http://127.0.0.1:8000/register/ and <br>http://127.0.0.1:8000/login/

*URL links built within app can also be accessed without authentication*

You can substitute http://127.0.0.1:8000/ for https://cspt1knowledgerocket.herokuapp.com/<br> in order to interact with deployed Heroku database

**All other routes require an active Authorization header:**

Auth Header:
<pre>
Authorization token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3R1c2VyMzIzIiwiZXhwIjoxNTQ4Mzk0NDgwLCJlbWFpbCI6InRlc3R1c2VyMTIzQHRlc3QuY29tIn0.fkBJi6NXPFTOj54dlMFsso5K67H6Q7XMdYdt_nZW8hg


To load quizzes:
	http://127.0.0.1:3000/quiz2d/className/rocketName
	http://127.0.0.1:3000/quiz2w/className/rocketName
	http://127.0.0.1:3000/quiz2m/className/rocketName


http://127.0.0.1:8000/register/
{
	"username": "testuser123",
	"email": "testuser123@test.com",
	"password1": "testuser123",
	"password2": "testuser123"
}

http://127.0.0.1:8000/login/
{
	"username": "testuser123",
	"password": "thisisNew"
}


http://127.0.0.1:8000/updateuser/
{
	"newEmail": "NOPE!323"
}

http://127.0.0.1:8000/updatepassword/
{
	"newPassword": "thisisNew"
}

http://127.0.0.1:8000/addclass/
{
	"className": "CSPT3"
}

**no request needed**
http://127.0.0.1:8000/getclasses/

**all fields must be unique to all rocket/questions currently in table(all users)**

http://127.0.0.1:8000/addrocket/
{

"rocketName": "TestRocket2313",
"className":"CSPT1",

"day2QuestionName": "day2QuestionName",
"day2QuestionText": "day2QuestionText",
"day2ReviewText": "day2ReviewText",
"day2AnswerA": "day2AnswerA",
"day2AnswerB": "day2AnswerB",
"day2AnswerC": "day2AnswerC",
"day2AnswerD": "day2AnswerD",
"day2CorrectAnswer": "day2Answer",

"week2QuestionName": "week2QuestionName",
"week2QuestionText": "week2QuestionText",
"week2ReviewText": "week2ReviewText",
"week2AnswerA": "week2AnswerA",
"week2AnswerB": "week2AnswerB",
"week2AnswerC": "week2AnswerC",
"week2AnswerD": "week2AnswerD",
"week2CorrectAnswer": "week2Answer",

"month2QuestionName": "month2QuestionName",
"month2QuestionText": "month2QuestionText",
"month2ReviewText": "month2ReviewText",
"month2AnswerA": "month2AnswerA",
"month2AnswerB": "month2AnswerB",
"month2AnswerC": "month2AnswerC",
"month2AnswerD": "month2AnswerD",
"month2CorrectAnswer": "month2Answer"

}

http://127.0.0.1:8000/addstudent/
{
	"studentName": "student4",
	"studentEmail": "student@student.com",
	"className": "CSPT1"
}

http://127.0.0.1:8000/updateclass/
{
	"oldClassName" : "CSPT1234",
	"newClassName" : "CSPT4321"
}

http://127.0.0.1:8000/updatestudent/
{
	"className": "CSPT4321",
	"oldStudentName": "student12",
	"newStudentName": "student12",
	"newStudentEmail": "teacher@student.com"
}

http://127.0.0.1:8000/getstudents/
{
	"className" : "CSPT1"
}

http://127.0.0.1:8000/removestudent/
{
	"className": "CSPT1"
	"studentName": "Lambda School"
	"studentEmail": "Lambda@school.com
}

**classes must already be created**
http://127.0.0.1:8000/updaterocket/
{
	"oldRocketName":"TestRocket3331",
	"oldClassName": "CSPT3",
	"newClassName": "CSPT4321"
}

http://127.0.0.1:8000/updatequestion2d/
{   
    "oldDay2QuestionName": "day2Quest1ionName11",
    "newDay2QuestionName": "day2Quest1ionName121313",
    
    "day2QuestionText": "day2Questi1onText11",
    "day2ReviewText": "day2ReviewTe1xt11",
    "day2AnswerA": "day2Answ11erA1",
    "day2AnswerB": "day2Answe1rB1",
    "day2AnswerC": "day2Answe1rC1",
    "day2AnswerD": "day2Answe1rD1",
    "day2CorrectAnswer": "day12Answer1"
}

http://127.0.0.1:8000/updatequestion2w/
{   
    "oldWeek2QuestionName": "week2Quest1ionName11",
    "newWeek2QuestionName": "week2Quest1ionName121313",
    
    "week2QuestionText": "week2Questi1onText11",
    "week2ReviewText": "week2ReviewTe1xt11",
    "week2AnswerA": "week2Answ11erA1",
    "week2AnswerB": "week2Answe1rB1",
    "week2AnswerC": "week2Answe1rC1",
    "week2AnswerD": "week2Answe1rD1",
    "week2CorrectAnswer": "week22Answer1"
}

http://127.0.0.1:8000/updatequestion2m/
{   
    "oldMonth2QuestionName": "month2Quest1ionName11",
    "newMonth2QuestionName": "month2Quest1ionName121313",
    
    "month2QuestionText": "month2Questi1onText11",
    "month2ReviewText": "month2ReviewTe1xt11",
    "month2AnswerA": "month2Answ11erA1",
    "month2AnswerB": "month2Answe1rB1",
    "month2AnswerC": "month2Answe1rC1",
    "month2AnswerD": "month2Answe1rD1",
    "month2CorrectAnswer": "month22Answer1"
}

http://127.0.0.1:8000/getrockets/
{
	"className" : "CSPT1"
}

http://127.0.0.1:8000/getrocketsbyclassname/
{
	"className" : "CSPT1"
}

http://127.0.0.1:8000/getquestion2d/
{
	"rocketName" : "TestRocket3331"
}

http://127.0.0.1:8000/getquestion2w/
{
	"rocketName" : "TestRocket3331"
}

http://127.0.0.1:8000/getquestion2m/
{
	"rocketName" : "TestRocket3331"
}
  
http://127.0.0.1:8000/buildemail/
{
	"className": "CSPT4",
	"title": "test email",
	"message": "hopefully this works?",
	"url": "http://127.0.0.1:3000/quiz2d/CSPT1/JSEssentialsReview"
}

http://127.0.0.1:8000/subscribe/
	**Used directly by stripe, no postman application**

http://127.0.0.1:8000/o/
http://127.0.0.1:8000/api/test/
**All oAuth endpoints are not currently is use**

http://127.0.0.1:8000/admin/
	Used to access Django's built in admin functionality with superuser credentials

</pre>

## Running Front End:

From root folder on your command prompt of choice ( We used git bash ) type `cd frontend`: then in there you will have to run `yarn install` or `npm install` ( your preference ), to install all frontend dependencies. After that is complete, you can proceed to `npm start`, or `yarn start`. This should locally host the frontend.

## Running Back End

From root folder on your command prompt of choice ( We used git bash ), type `pipenv install`, then after the dependencies have been installed you can proceed to then type `pipenv shell`. You have now created a virtualEnv for the backend, now you can type, `python ./manage.py makemigrations`. If it says "No changes detected", you will still want to migrate, considering you cloned a local project, you still need to fill the DB with Django tables for it to organize the data. So after you made migrations, type `python ./manage.py migrate`, you will notice, it migrates the DB!

You are almost complete, after you have successfully migrated the server, you will then type `python ./manage.py runserver`. Viola, you have now locally hosted the backend!



For a net- hosted frontend + backend without having to set it up locally:
- [Knowledge Rocket](https://infallible-euler-24eb8a.netlify.com/)


## Environment Variables

| Variable         |
| :--------------- | 
| `SECRET_KEY`      |
| `DATABASE_URL` |
| `ALLOWED_HOSTS`       |
| `EMAIL_HOST_PASSWORD`     |
| `STRIPE_SECRET_KEY`     |
| `PLAN_ID`     |

> **Note:** Without this file, and variables defined. Knowledge Rocket will fail to load up.
> We will provide you with the defined variables.

<details><summary>Provided Variables for Local Host</summary>
<p>

#### ENV file example that can be used
In your root directory just create a file called ```.env```, and copy and paste these
variables into it.
```
SECRET_KEY=2^sl@j+c(btlk_k8h+r(guaw^%am0vx4t&@*qh+3o05dbxg^a4
DEBUG=False
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=*
EMAIL_HOST_PASSWORD= SendGrid API
STRIPE_SECRET_KEY= Stripe Secret Key
PLAN_ID= Stripe Plan ID
```

</p>
</details>

## Instructions

	Step 1
		Create User/Login

	Step 2
		Navigate to create class page (selecting new class from post-login splash screen).
		create a new class (class name must be unique).

		add at least 1 student via add student section of create class page.
		
	Step 3 
		Navigate to create rocket page (selecting new rocket from bottom of create class page).

		Follow the onscreen instructions; select your newly created class then proceed to fill out available fields.

		The answer fields are multiple choice answer pertaining to the previous question.

		Each question has 1 correct answer that you select by clicking the corresponding radio buttons.

		After you have completed the form click submit and you will be redirected to the rocket page that lists all the rockets according to the selected class.

	Step 4
		Navigate to the build and send email section of the application. (Linked in the Email portion of the Navigation bar).

		Use the drop downs to select a class first; then select the rocket second.

		Once a valid class and rocket have been selected click the button that corresponds to the interval you wish to send.

		Each interval corresponds the rocket fields you filled out in the create rocket page.

		Once you have selected the interval that portion of your rocket will be previewed at the bottom of the page.

		Enter an email title and short message to your students.

		If that data is correct click the build and send email button; this will build an email with a the submitted title and message as well as a URL that corresponds to the interval and portion of the rocket that you selected.

		The email will then be sent to every student in the selected class.
	
	Step 5
		Once your students receive your email the email will inherit the title and message you submitted; as well as a hyperlink student can use to display the quiz.

		By navigating to the hyperlink a quiz will load; students then read the review text and question; submit their answer and an alert will pop up indicating the correct answer.

**Note due to time constraints and issues the delayed sending functionality was not completed, emails do however send immediately to all class students**

