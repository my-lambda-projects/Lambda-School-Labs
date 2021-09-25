# **BRAWNDO** (**Workout Tracker**)

**BRAWNDO** is a workout journal for the connected age. Schedule future workouts, review past workouts, and even bring STRONGR into the gym with you to track your performance on every exercise in your routine.

# DISCLAIMER - BRAWNDO IS UNDER ACTIVE DEVELOPMENT AT LAMBDA LABS. THIS REPO IS NOT FEATURE COMPLETE.

- [Building Locally](#building-locally)
- [Deploying](#deploying)
- [Config Variables](#config-variables)
- [User Routes](#user)
- [Progress Routes](#progress)
- [Routine Routes](#routines)
- [Exercise Routes](#exercises)
- [Workout Routes](#workouts)
- [Performance Routes](#performances)

## Building Locally

---

The repo contains two main directories: `server` and `client`. You will need to build each to run the app for local development. Commands for each directory assume you start at the route of that directory.

Server:
`npm install && npm start`

Client:
`npm install && npm start`

## Deploying

---

The standard method for deploying the app is Zeit's [Now](https://zeit.co/now) service, and the `package.json`s in each main directory provide `now-start` scripts for automatic deploy configuration. Note that the `dotenv` code in the repo requires that for the backend/server, either the config vars be set through the Now app or CLI, or that a `.env` be included with the deploy through the `--dotenv` flag.

A daily deploy is currently being maintained at `strongr.tech` (and `strongr-server.tech` for the back-end).

### Config Variables:

---

> USERNAME should be a username for an mLab database.

> PASSWORD should correspond to USERNAME

> SECRET is an arbitrary string, used to sign JWTs.

> SENDGRID_API_KEY is used to send password recovery emails through Sendgrid

> MAILER_EMAIL_ID is the SendGrid mailer ID, which will determine the email address those emails are sent from.

> STRIPE_API_KEY_TEST is the test key used to process payments though Stripe (there will be a STRIPE_API_KEY) for production

# Endpoints

### User

---

- `/register`

  - POST
    - `{ username, password, email }`
    - Creates a new User document and responds with its token.

  Request:

  ```
  {
    "username": "exampleuser",
    "password": "examplepass",
    "email": "example@user.com"
  }
  ```

- `/login`

  - POST
    - `{ username, password }`
    - Searches for a User document and responds with its token if one is found.

  Request:

  ```
  {
    "username": "exampleuser",
    "password": "examplepass"
  }
  ```

- `/forgot_password`

  - POST
    - `{ email }`
    - Uses SendGrid to send a password recovery email with a unique token for request verification.

  Request:

  ```
  {
    "email": "example@user.com"
  }
  ```

- `/reset_password`

  - POST
    - `{ token, newPassword, confirmNewPassword }`
    - Finds the user with the provided reset token and update their password.

  Request:

  ```
  {
    "newPassword":"newexamplepass",
    "confirmNewPassword": "newexamplepass",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXFjdXMiLCJpYXQiOjE1MzY5NDIyNzYsImV4cCI6MTUzNjk0NDA3Nn0._EHg-GGv_z7RsXZCwInDBUM0ZgZSHUZ_jw6hQmi-TRM"
  }
  ```

- `/auto-login`

  ##### Requires Authentication

  - GET
    - No request body, but route requires a valid JWT in the "x-access-token" header.
    - Checks a provided token for validity, responding with the token and an OK status if the token is good. For an example of usage, see the `AccessControl` component.

- `/settings_password`

  ##### Requires Authentication

  - POST
    - `{ username, password, newPassword, confirmNewPassword }`
    - Searches for the user via the username, if the provided current password is correct, the password will be changed.

  Request:

  ```
  {
    "username": "exampleuser",
    "password": "examplepass",
    "newPassword": "newexamplepass",
    "confirmNewPassword": "newexamplepass"
  }
  ```

- `/settings_email`

  ##### Requires Authentication

  - POST

    - `{ username, newEmail }`
    - Searches for the user with the provided username, then changes the email.

  Request:

  ```
  {
    "username": "exampleuser",
    "newEmail": "newexample@user.com"
  }
  ```

- `/charge`

  ##### Requires Authentication

  - POST
    - `{ id, token }`
    - Uses Stripe to process a payment
    - Changes the user status of premiumUser from false to true.
    - The token is generated on the client side via a Stripe function `createToken`
    - For more information on using Stripe with React and Express visit the [Stripe Docs](https://stripe.com/docs/recipes/elements-react)

  Request:

  ```
  {
    "id": "5bb7652a75d9aa8b8805046d",
    "token": "tokenGeneratedFromStripe"
  }
  ```

### Progress

---

- `/progress`

  ##### Requires Authentication

  - POST

    - `{ weight, hips, waist, r_arm, l_arm, r_leg, l_leg, user }`
    - Add a progress entry to the User's history.

  Request:

  ```
  {
    "weight": 180,
    "hips": 40,
    "waist": 40,
    "r_arm": 15,
    "l_arm": 15,
    "r_leg": 20,
    "l_leg": 20,
    "user": "5bb7652a75d9aa8b8805046d"
  }
  ```

  - GET
    - Retrieves a User's progress history.

- `/progress/:id`

  ##### Requires Authentication

  - PUT

    - `{ weight, hips, waist, r_arm, l_arm, r_leg, l_leg, user }`
    - Finds the progress document by id and updates it.

  Request:

  ```
  {
    "weight": 160,
    "hips": 40,
    "waist": 40,
    "r_arm": 15,
    "l_arm": 15,
    "r_leg": 20,
    "l_leg": 20,
    "user": "5bb7652a75d9aa8b8805046d"
  }
  ```

  - DELETE
    - Finds the progress by id and deletes it from the Progress Collection and deletes the corresponding reference in the User collection.

### Routines

---

- `/new-routine`

  ##### Requires Authentication

  - POST
    - `{ title }`
    - Creates a new Routine for a User, i.e. "Arm Day"

  Request:

  ```
  {
    "title": "Arm Day"
  }
  ```

- `/routine`

  ##### Requires Authentication

  - GET

    - `{ routineId }`
    - Retrieves a routine document by the given id.

  Request:

  ```
  {
    "routineId": "5bb773923fc6b98e25713139"
  }
  ```

  - PUT

    - `{ routineId, title }`
    - Returns the document with the update applied.

  Request:

  ```
  {
    "title": "Get Ripped",
    "routineId": "5bb773923fc6b98e25713139"
  }
  ```

  - DELETE
    - `{ routineId }`
    - Finds the routine by id and deletes it from the Routine Collection and deletes the corresponding reference in the User collection.

  Request:

  ```
  {
    "routineId": "5bb773923fc6b98e25713139"
  }
  ```

- `/routines`

  ##### Requires Authentication

  - GET
    - Retrieves a list of the User's routines hydrated/populated with Exercise documents.

- `/routine-rich`

  ##### Requires Authentication

  - POST
    - `{ routineId }`
    - Retrieves a routine by the routine id hydrated/populated with Excercise documents

  Request:

  ```
  {
    "routineId": "5bb773923fc6b98e25713139"
  }
  ```

### Exercises

---

- `/new-exercise`

  ##### Requires Authentication

  - POST
    - `{ name, currentWeight, currentReps, currentSets }`
    - `currentWeight` default: `10`, optional
    - `currentReps` default: `5`, optional
    - `currentSets` default: `3`, optional
    - Creates a new Exercise for a User, i.e. "Bench Press"

  Request:

  ```
  {
    "name": "Bench Press"
  }
  ```

- `/add-exercise`

  ##### Requires Authentication

  - POST
    - `{ routineId, exerciseId }`
    - Adds an Exercise to a particular Routine, i.e. add "2k Run" to "Cardio"

  Request:

  ```
  {
    "routineId": "5bb773923fc6b98e25713139",
    "exerciseId": "5bb78b4ba2e99b92619b4d97"
  }
  ```

- `/exercise`

  ##### Requires Authentication

  - GET

    - `{ exerciseId }`
    - Retrieves an exercise by the exercise id

  Request:

  ```
  {
    "exerciseId": "5bb78b4ba2e99b92619b4d97"
  }
  ```

  - PUT

    - `{ exerciseId, name, currentWeight, currentReps, currentSets }`
    - Finds an exercise document by id and returns it with update applied

  Request:

  ```
  {
    "exerciseId": "5bb78b4ba2e99b92619b4d97",
    "name": "Bench Press",
    "currentWeight": 5,
    "currentReps": 5,
    "currentSets": 5
  }
  ```

  - DELETE
    - `{ exerciseId }`
    - Finds the exercise by id and deletes it from the Exercise Collection and deletes the corresponding reference in the User collection.

  Request:

  ```
  {
    "exerciseId": "5bb78b4ba2e99b92619b4d97"
  }
  ```

### Workouts

---

- `/schedule-workout`

  ##### Requires Authentication

  - POST
    - `{ routineId, userId, date, note }`
    - `note`, optional
    - Creates a new Workout with the provided date.
    - Creates a new Performance of each Exercise referenced in the provided Routine, with the provided date.
    - Each Performance document for a specific performance of an exercise is referenced in the document for the Workout. Each Performance document is also referenced in the corresponding Exercise document.
    - Finally, the Workout document is referenced in the provided User document in the `calendar` property, providing an entry point to get from the User level to more specific records.

  Request:

  ```
  {
    "routineId": "5bb78ff2a2e99b92619b4d98",
  	"date": "2018-10-04T22:00:00.000Z"
  }
  ```

- `/fetch-workout`

  ##### Requires Authentication

  - POST
    - `{ workoutId }`
    - Retrieves a workout by the workout id

  Request:

  ```
  {
    "workoutId": "5bb7910aa2e99b92619b4d99"
  }
  ```

- `/workouts`

  ##### Requires Authentication

  - GET
    - Retrieves a list of all workouts associated with the user id

- `/workouts/:id`

  ##### Requires Authentication

  - DELETE
    - Finds the workout by id and deletes it from the
      Workout Collection and deletes the corresponding reference in the User collection and Routine collection

- `/workouts-copy`

  ##### Requires Authentication

  - POST
    - `{ startDate, endDate, shiftDistance }`
    - Finds user by id and populates calendar workouts
    - Filters calendar entries from the start and end dates.
    - For each workout in range schedules new workouts to the shiftDistance (milliseconds) selected which is turned into a new Date.

  Request:

  ```
  {
    "startDate": "2018-10-03T22:00:00.000Z",
    "endDate": "2018-10-05T22:00:00.000Z",
    "shiftDistance": 604800000
  }
  ```

### Performances

---

- `/performance/:id`

  ##### Requires Authentication

  - PUT
    - Toggles the completed property of the associated Performance document

- `/performances`

  ##### Requires Authentication

  - GET
    - Retrieves a list of all performances associated with the user id

---

#### BRAWNDO is under construction by Amanda Phillips, Iqra Javed, Leon Bates and Xang Thao.

---
