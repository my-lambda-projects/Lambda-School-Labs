# CS8-employeeshift
# iShiftr

iShiftr gives you the flexibility of creating schedules for your employees in the most efficient way. We adapt to your company's needs by automating the way you manage employee hours and sudden changes, such as absences and requested time-off, all with ease. 

View app live on: 

[Backend](https://ishiftr-db.herokuapp.com/ "Backend")

[Frontend](https://ishiftr.netlify.com/ "Frontend")

## Employers are able to:
- Sign Up & Sign In
- View Specialized Dashboard Menu
- Add/Delete Employees
- Create New Schedules for Employees Based Their Availability
- Create a New Password from within the Settings Menu

To sign up as an employer click the signup button on the top right hand corner of https://ishiftr.netlify.com/. Then create your account by filling in each required field. Once you have registered your account, now you can now sign in and start creating a schedule for your employees.

<hr>

## Getting Started
Fork / Clone this project into a directory on your machine.
cd into the root directory of your local copy.  

### Prerequisites
iShiftr requires [NodeJS](https://nodejs.org/en/ "NodeJS") and [MongoDB](https://www.mongodb.com/ "MongoDB") to run locally.


### Installing 
RUN ```yarn install```
or
```npm install```
to retrieve all server-side the dependencies.
LOOK at all the files you've been given for this project. One important file to note is server.js. 
RUN yarn start or npm start to get your App up and running on http://localhost:3000.

---

# iShiftr API

## Endpoints

---

### POST -- `/api/register`

---

Registers a new Employer.

---

| Field      | Type       | Required |
|------------|------------|----------|
|Username    | String     | Yes      |
|First Name  | String     | Yes      |
|Last Name   | String     | Yes      |
|Email       | Email      | Yes      |
|Password    | String(5+) | Yes      |
|Phone Number| Number     | Yes      |

---

### POST -- `api/employerLogin`

---

Login as an existing Employer.

---

| Field      | Type       | Required |
|------------|------------|----------|
|Username    | String     | Yes      |
|Password    | String     | Yes      |

---

### POST -- `api/:id/createEmployee`

---

Creates a new Employee for the logged in Employer.

---

| Field         | Type       | Required |
|---------------|------------|----------|
|First Name     | String     | Yes      |
|Last Name      | String     | Yes      |
|Email          | Email      | Yes      |
|Phone Number   | Number     | Yes      |
|Availability   | String     | Yes      |
|Available Hours| Number     | Yes      |
|Username       | String     | Yes      |
|Password       | String(5+) | Yes      |

---

### PUT -- `api/editEmployee/:id`

---

| Field         | Type       | Required |
|---------------|------------|----------|
|First Name     | String     | No      |
|Last Name      | String     | No      |
|Email          | Email      | No      |
|Phone Number   | Number     | No      |
|Availability   | String     | No      |
|Available Hours| Number     | No      |

---

### DELETE -- `/api/deleteEmployee/:id`

---

Deletes the selected Employee and their data.

---

### PUT -- `/api/:id/editPassword`

---

Edits the password of the logged in Employer if the token and correct information is passed and `admin=true`.

---

| Field           | Type       | Required |
| --------------  |------------|----------|
| Password        | String(5+) | Yes      |
| Confirm Password| String     | Yes      |

### GET -- `/api/:id/employees`

---

Gets the current Employees for the logged in Employer if the correct token is passed and `admin=true`.

---

### GET -- `/api/employer/:id`

---

Gets the current Employer's data/information if the correct token is passed and `admin=true`.

---

### POST -- `/api/createSchedule/:id`

---

The logged in Employer can create a new schedule for their Employees if the correct token is passed and `admin=true`.

---

### GET -- `/api/schedule/:id`

---

Get the schedule of the current week if logged in as an Employer and the correct token is passed with `admin=true`.

---

### GET -- `/api/:id/schedule`

---

Get the schedule of the current week if logged in as an Employee and the correct token is passed.

---

### DELETE -- `/api/schedule/:id`

---

Deletes the selected schedule

---

### POST -- `/api/employeeLogin`

---

Login as an existing Employee with the credentials provided by the Employer

---

| Field      | Type       | Required |
|------------|------------|----------|
|Username    | String     | Yes      |
|Password    | String     | Yes      |

---

### GET -- `/api/employee/:id`

---

Gets the logged in Employee's data/information if the correct token is passed.

---

### PUT -- `/api/employee/:id/editPassword`

---

Edits the password of the logged in Employee if the token and correct information is passed

---

Edits the password of the logged in Employee if the token and correct information is passed.

---

| Field           | Type       | Required |
| --------------  |------------|----------|
| Password        | String(5+) | Yes      |
| Confirm Password| String     | Yes      |

---

# Team of ```iShiftr```
### - Cristina Laryea [@crispad](https://github.com/crispad)
### - Aquila Strother [@astro11](https://github.com/astro11)
### - Ajmal Jalal [@ajmaljalal](https://github.com/Ajmaljalal)
### - Habib-ur-Rehman [@habib1234731](https://github.com/habib1234731)