<div align="center">
<h1>Welcome to Randomizer</h1>
</div>

Web App Deployed at:
https://labs8randomizer2.netlify.com/

API Deployed at:
https://labs8randomizer.herokuapp.com/admin/login/?next=/admin/


<h1>User Stories</h1>
<p>Randomizer is an app that will help educators or group facilitators track and record their class or group participation.  For educators/facilitators, class engagement is very important to a student's learning process.  Research has shown, that students who are actively engaged in the learning process increases their attention and focus, motivates them to higher critical thinking skills and promotes meaningful learning experiences, basically makes learning fun.  Randomizer has a Main Feature, click the Magic Randomizer Button and it will randomly choose one of their enrolled students.  This feature can help a user by not always calling on the same students, but gives opportunity to all students to engage in the conversation.  After a name has been chosen, the user can either click "participate" or "decline" to record if that student participated or not.  This information will be stored in our database that will then give a particiation progress chart to the class participation and individual students.  This may be useful to educators to gauge how well their class is engaged and maybe use this information to taylor their delivery of information.  A very cool feature is a the overall classroom participation percentage data.  This app will archive the data and show their class and individual student participation progress through graphs.</p>


## TABLE of Contents
1. [Technology Stack]


2. [Developer Tools](#developer-tool)


4. [Navigating App's Feature]

5. [Database Schemas / Endpoints]

5. [Team Members]

6. [License]



##Technology Used for this Project
   -Frontend:
   --Language: Javascript
   --Framework: React
   --Styled Components
   --Graphs:  Recharts.js
   --Libraries: Materialize UI
   --Axios
   --Node.js - npm / yarn start

   -Backend:
   --Language: Python
   ---pip environment - pipenv shell
   --Server Framework: Django
   --Database: SQLite / Postgres SQL
   --CORS

   -Deployment:
   --Frontend: Netlify
   --Backend: Heroku

#Why Used these Technologies:


-FRONTEND:  **REACT**  - We used React as our frontend framework, One for our familiarity as a team, and because its component-based structure allows rapid implementation of a functional user interface with a minimum of effort.

-BACKEND: **DJANGO**  -
We decided to use Django for our backend server.  With it's built in packages, it was a good choice for our team to use as it is quick to implement a backend server and a client server.  Django has a built in SQL-based database (SQLite) without needing to create SQL queries to its simple MVC approach. It also comes with built -in client side server, This allows us to access to a built out UI and start testing immediately.

-DATABASE:  **POSTGRES SQL / SQLITE**  -
As our application makes use of relational data, e.g. user/teacher --> class --> student list --> student --> student participation is assigned to what class, it made sense early on to use a relational database, which are traditionally SQL based. Fortunately, Django integrates quickly with both SQLite, which is the default for development and can be converted to PostgreSQL,  which is used by Heroku.

-FRAMEWORKS **ReCharts.js:**
We used ReCharts for our choice to output graphs.  We felt that our app needed graphs to track/record a students participation progress by using a circle chart and show a bar graph of the overall class participation.  ReCharts gave us good graph options.


##Developer Tools Used for this Project
    -[Wireframe]
    --Balsamiq
    - [Local Installation]
    - [3rd Party API]
    --Twilio
    --OAuth:  Google developer API
    -Testing
    -Security
    --Two password verfication
    -User Authorization/Authentication
    --JSON Web Tokens (JWT) Authorization
    -Payment
    --Stripe
    -Team Communication Tools / Agile Tools
    --Trello
    --Slack
    --Zoom
    --Discord


## Navigating App Features
#Guide to Randomizer App Pages

## Landing Page
Link: https://labs8randomizer2.netlify.com/

## Sign Up/ Registration Page
Link: https://labs8randomizer2.netlify.com/Signup

## Login Page
https://labs8randomizer2.netlify.com/Login
Google Login

## Class View Page (Class List Dashboard)
https://labs8randomizer2.netlify.com/Class
Before you can start the Randomizer Feature, you will need to add a class.  After a class has been created, you will be able to view a summary of your class list on this page.  You will have a graph that will have class details of how many students are enrolled,

## Create or Edit A Class Page
https://labs8randomizer2.netlify.com/Random


## Magic Randomizer Feature Page
https://labs8randomizer2.netlify.com/Random

## Billing Page
https://labs8randomizer2.netlify.com/Settings

## Settings Page
https://labs8randomizer2.netlify.com/Settings

## Log out
https://labs8randomizer2.netlify.com/



##Database: SQLite / PostGres SQL

#Two Models:
USER Model - User Information

| Endpoints    | API Routes               | Routes To
| ------------ | -------------------------|---------------------------------
| POST         | /api/registration        | User Sign Up
| GET          | /api/login               | User Login
| GET          | /api/tokenregister       | Register Token from Google API
| POST         | /api/updateuser          | Update User Info


CLSS Model - Class, Student, Student Participation

| Endpoints    | API Routes                | Routes To
| ------------ | --------------------------|---------------------------------
| POST         | /clss/create_class        | Add a New Class
| GET          | /clss/class_list          | List Classes
| POST         | /clss/add_student         | Add New Student
| GET          | /clss/list_student        | List Students 
| POST         | /clss/participate         | Single Student Participate
| POST         | /clss/participation_list  | Class Participation
| GET          | /clss/get_everything      | Class/Student/Participate Info
| PUT          | /clss/updatestudent       | Update Student Name
| PUT          | /clss/updateclass         | Update Class Name
| DELETE       | /clss/deletestudent       | Delete Student
| DELETE       | /clss/deleteclass         | Delete Class
| POST         | /clss/csv_post            | Store CSV class/student info


##USER Model - User Information

This Schema is registers a new user.
POST -- `/api/registration`  --POST

| Field        | Input                     | Required |
| ------------ | ------------------------- | -------- |
| username     | String, 30 chars max      | No       |
| email        | String, 30 chars max      | Yes      |
| password1    | String 5+ characters      | Yes      |
| password2    | String matching password  | Yes      |


GET -- `/api/login` -- GET

| Field       | Input                  | Required |
| ------------| ---------------------- |----------|
| email       | String, 30 chars max   | Yes      |
| password1   | String 6+ characters   | Yes      |



POST -- `/api/updateuser/` -- POST

| Property | Type   | Required |
| -------- | ------ | -------- |
| email    | String | Yes      |
| password1| String | Yes      |
| password2| String | Yes      |



## Project Team Members
| [<img src=".../Img/ray.PNG" align="center" width=100><br><b>Raymond Garcia</b> ](https://github.com/Raymondgrc) | [<img src=".../Img/sus.PNG" align="center" width=100><br><b>Susanna</b>  ](https://github.com/sulemc) | [<img src=".../Img/emme.PNG" align="center" width=100><br><b>Emmeline Aquino</b>  ](https://github.com/emaquino44) | [<img src=".../Img/nicksface.PNG" align="center" width=100><br><b>Nick Smith</b>  ](https://github.com/NickolausSmith) |
|---|---|---|---|


## License
Randomizer is [MIT licensed.](LICENSE)
