# MyShift API

Myshift API provides programmatic solution to schedule and maintain business operations and employees.
Myshift website's functionality: Account Info, Hours of Operation, Employees, Shifts Info,, as well as user profiles.


MyShift follows Django's [REST FRAMEWORK]https://www.django-rest-framework.org/)
and uses [OAuth2](https://www.django-rest-framework.org/api-guide/authentication/) for user authentication purposes.
Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").

***
![alt text](C:\Users\brand\Lambda School\CS10-employee-shift\back-end\images\database.png)



## Endpoints

#### API Resources

## Users

- **[<code>GET</code> /api/users/]**
- **[<code>POST</code> /api/users/]**
- **[<code>DELETE</code> /api/users/:id/]**
- **[<code>PUT</code> /api/users/:id/]**
- **[<code>Patch</code> /api/users/:id/]**


## Profiles

- **[<code>GET</code> /api/profiles/]**
- **[<code>POST</code> /api/profiles/]**
- **[<code>DELETE</code> /api/profiles/:id/]**
- **[<code>PUT</code> /api/profiles/:id/]**
- **[<code>Patch</code> /api/profiles/:id/]**

## Accounts

- **[<code>GET</code> /api/accounts/]**
- **[<code>POST</code> /api/accounts/]**
- **[<code>DELETE</code> /api/accounts/:id/]**
- **[<code>PUT</code> /api/accounts/:id/]**
- **[<code>Patch</code> /api/accounts:id/]**

## Requestoff

- **[<code>GET</code> /api/requestoff/]**
- **[<code>POST</code> /api/requestoff/]**
- **[<code>DELETE</code> /api/requestoff/:id/]**
- **[<code>PUT</code> /api/requestoff/:id/]**
- **[<code>Patch</code> /api/requestoff/:id/]**

## Shifts

- **[<code>GET</code> /api/shifts/]**
- **[<code>POST</code> /api/shifts/]**
- **[<code>DELETE</code> /api/shifts/:id/]**
- **[<code>PUT</code> /api/shifts/:id/]**
- **[<code>Patch</code> /api/shifts/:id/]**

## Availabilities

- **[<code>GET</code> /api/availabilities/]**
- **[<code>POST</code> /api/availabilities/]**
- **[<code>DELETE</code> /api/availabilities/:id/]**
- **[<code>PUT</code> /api/availabilities/:id/]**
- **[<code>Patch</code> /api/availabilities/:id/]**

## Hours of Operations

- **[<code>GET</code> /api/hoos/]**
- **[<code>POST</code> /api/hoos/]**
- **[<code>DELETE</code> /api/hoos/:id/]**
- **[<code>PUT</code> /api/hoos/:id/]**
- **[<code>Patch</code> /api/hoos/:id/]**

## Sign up

- **[<code>GET</code> /api/sign_up/]**
- **[<code>POST</code> /api/sign_up/]**
- **[<code>DELETE</code> /api/sign_up/:id/]**
- **[<code>PUT</code> /api/sign_up/:id/]**
- **[<code>Patch</code> /api/sign_up/:id/]**


* password is needed as parameter provided by the meta creator to require verification when performing any non-GET operations on their meta

## Stripe
- **[<code>POST</code> /api/creat-charge/]**
![alt text](C:\Users\brand\Lambda School\CS10-employee-shift\back-end\images\stripe flow.png)

## Twilio
- **[<code>POST</code> /api/sms/]**

## Sendgrid
- **[<code>POST</code> /api/sendgrid/]**


## Authentication

- **[<code>POST</code> o/application/]**
- **[<code>POST</code> o/token]**
- **[<code>POST</code> o/authorize]**

## FAQ
### What do I need to know before I start using the API?
Got rust on your skills? No worries. Here are the docs you might need to get started:

- HTTPS protocol
- [https://www.django-rest-framework.org/][]
- Authentication with [OAuth][] (or the official [Beginner’s Guide][])
- Data serialization with [JSON][] (or see a [quick tutorial][])

### How do I connect to the Myshift API?
The API is only available to authenticated clients. Clients should authenticate users using [OAuth][]. Once authenticated, you need to request a resource from one of the endpoints using HTTPS. Generally, reading any data is done through a request with GET method. If you want our server to create, update or delete a given resource, POST or PUT methods are required.

### What return formats do you support?
Myshift API currently returns data in [JSON](http://json.org/ "JSON") format.
