<p align="center">
  <br><br>
<img src="./client/src/components/images/LHSlogo.png "/>
</p>


# **Description**

### Lambda Hair School is a hair salon based application that allows clients to select their desired hair style, schedule a appointment and pay online. The client has the ability to sign up and create a account so they can have their account details available for things such as up coming appointments, rescheduling of appointments and cancellations. Clients have the ability to leave their feedback on the application. The "ADMIN" has the capability to view all appointments, make necessary changes and view all feedback left by clients. 

## TechStack

- Javascript
- HTML/CSS
- ReactJS
- React Router
- Python
- Django
- Bootstrap
- Netlifly
- Heroku
- Stripe API
- SQLite
- Axios


## App Walkthrough

- Create a Clients/User account  (username - email- password)
- Clients can set appointment 
- Clients can go to schedule page choose services, stylist , time and date 
- from billing page Clients can pay online from the app 
- Clients have the ability to leave their feedback on the application


# **Deployed Site**

### https://www.lambdahairschool.com/

## API URL `https://aqueous-cove-88989.herokuapp.com`

## hairschool endpoints

## Logging and Authorization

### POST -- `/hairschool/rest-auth/registration`

Registers a new client.

| Property |     Type      | Required |
| -------- | ------------- | -------- |
| username | alphanumeric, *unique* | Yes      |
| password1 | String at least 8 alpha-numeric characters | Yes      |
| password2 | String at least 8 alpha-numeric characters, should equal 'password1' | Yes      |
| email | requires an `@` and a `.` as in a typical email address, *unique* | no      |


**Success**

```js
{
  key: 'a123123b321321c123123',
};
```

**Fail**

```js
{
  username: 'Reason for failure',
  email: 'Reason for failure',
  password1: 'Reason for failure',
  password2: 'Reason for failure'
}
```
### POST -- `/hairschool/rest-auth/registration/verify-email/`

### POST -- `/hairschool/rest-auth/login`
```
// params:
{
  username,
  email,     // Optional
  password,
}
```
### POST -- `/hairschool/rest-auth/logout`
```
// params:
{
  // none
}
```
### POST -- `/hairschool/rest-auth/password/reset`
```
// params:
{
  email
}
```
### POST -- `/hairschool/rest-auth/password/reset/confirm/`
```
// params:
{
  uid,
  token,
  new_password1,
  new_password2
}
```
### POST -- `/hairschool/rest-auth/password/change/`
```
// params:
{
  new_password1,
  new_password2,
  old_password
}
```


## User Manipulation

### GET -- `/hairschool`

Gets all users in database.

Token must be set in Authorization headers as `'token a123123b321321c123123'`

**Success**

```js
{
  [
    {
      username: 'username',
      email: 'email'
    },
    {
      username: 'username',
      email: 'email'
    },    
    {
      username: 'username',
      email: 'email'
    },
    // ... continues to lists all users
  ]
};
```

**Fail**

```js
{
  detail: 'Failure info'
}
```


