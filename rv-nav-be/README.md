# API Documentation

#### Backend deployed at [Heroku](https://labs15rvlife.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn dev** to start the local server
- **yarn test** to start server using testing environment

### Backend framework Node with Express

- Utilizing bcrypt for hashing passwords
- Utilizing cors for dev and production cross origin compliance
- Utilizing dotenv to access our environment variables
- Utilizing jest and supertest for testing
- Utilizing Jsonwebtokens for authentication
- Utilizing postgresql for the DB

## Endpoints

# UserRoutes

#### User Routes

| Method | Endpoint          | Access Control | Description        |
| ------ | ----------------- | -------------- | ------------------ |
| POST   | `/users/register` | none           | Creates a new user |
| POST   | `/users/login`    | none           | login a user       |

#### USERS

---

## Register

---

Method: ** POST ** `/users/register`

### Example Registration Post Object

```
{
  email: "test@email.com" // STRING
  password: "password123", // STRING (REQUIRED)
}
```

### Example Response Object

```
{
  "id": 11,
  "email": "test@email.com",
  "password": "$2a$10$o0Pnu3b8BTQMWHucDP3tAu6//QcXSzyxz91nIynwKWLMqX1bso7Tq",
  "created_at": "2019-11-10 23:50:51",
  "updated_at": "2019-11-10 23:50:51"
}
```

## Login

---

Method: ** POST ** `/users/login`

### Example Registration Post Object

```
{
	"username": "test@email.com",
	"password": "password"
}
```

### Example Response Object

```
{
  "message": "Welcome test3@email.com!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJpYXQiOjE1NzM0MjYwODYsImV4cCI6MTU3NDAzMDg4Nn0.TUjWxE6mgO3OF2BJe-IP3dXygKTz6WsFWfDPBrqlKRo",
  "user": {
    "id": 6,
    "email": "test@email.com",
    "password": "$2a$10$CI/hT2fflCygLGls/QE/y./ng1B9d0PARB.OZJyJMBWQ8euFJtiC6",
    "created_at": "2019-11-10 22:46:50",
    "updated_at": "2019-11-10 22:46:50"
  }
}
```

# VehicleRoutes

#### Vehicle Routes

| Method | Endpoint       | Access Control | Description           |
| ------ | -------------- | -------------- | --------------------- |
| POST   | `/vehicle`     | JWT            | Creates a new vehicle |
| GET    | `/vehicle`     | JWT            | get vehicle list      |
| GET    | `/vehicle/:id` | JWT            | get specified vehicle |
| PUT    | `/vehicle/:id` | JWT            | update vehicle        |
| DEL    | `/vehicle/:id` | JWT            | delete vehicle        |

#### Vehicles

---

## Create Vehicle

---

Method: **POST** `/vehicle` (Protected)

### Example Vehicle Creation Post Object

```
{
    "name": "The Hot Rod", // STRING (REQUIRED)
	"height": 12.3, // FLOAT
	"weight": 12000.3, // FLOAT
	"width": 10.3, // FLOAT
	"length": 42.3, // FLOAT
	"axel_count": 2, // INTEGER
	"vehicle_class": "A", // STRING
	"dual_tires": true, // BOOLEAN
	"trailer": false //BOOLEAN
}
```

### Example Response Object

```
{
    "id": 14,
    "user_id": 2,
    "name": "The Hot Rod",
    "height": 12.3,
    "width": 10.3,
    "length": 42.3,
    "weight": 12000.3,
    "axel_count": 2,
    "vehicle_class": "A",
    "created_at": "2019-08-24 02:24:38",
    "updated_at": "2019-08-24 02:24:38",
    "dual_tires": 1,
    "trailer": 0
}
```

## Retrieve Vehicles List

---

Method: **GET** `/vehicle` (Protected)

### Example Response Object

```
[
    {
        "id": 14,
        "user_id": 2,
        "height": 14.3,
        "width": 12.3,
        "length": 42.3,
        "weight": 12000.3,
        "axel_count": 2,
        "class": "A",
        "created_at": "2019-08-24 02:24:38",
        "updated_at": "2019-08-24 02:24:38",
        "dual_tires": 1,
        "trailer": 0
    },
    {
        "id": 15,
        "user_id": 2,
        "height": 10.3,
        "width": 10.3,
        "length": 30.3,
        "weight": 8000.3,
        "axel_count": 1,
        "class": "C",
        "created_at": "2019-08-24 02:55:01",
        "updated_at": "2019-08-24 02:55:01",
        "dual_tires": 0,
        "trailer": 1
    }
]
```

## Retrieve Single Vehicle

---

Method: **GET** `/vehicle/:id` (Protected)

### Example Response Object

```
{
    "id": 14,
    "user_id": 2,
    "height": 14.3,
    "width": 12.3,
    "length": 42.3,
    "weight": 12000.3,
    "axel_count": 2,
    "class": "A",
    "created_at": "2019-08-24 02:24:38",
    "updated_at": "2019-08-24 02:24:38",
    "dual_tires": 1,
    "trailer": 0
}
```

### Example Error Response Object

```
{
    "message": "No vehicle by that id"
}
```

## Update Single Vehicle

---

Method: **PUT** `/vehicle/:id` (Protected)

### Example Put Object **_note that you can update 1 or multiple fields_**

```
{
	"height": 14.3,
	"width": 12.3
}
```

### Example Response Object

```
1 // the count of updated objects
```

### Example Error Response Object

```
{
    "message": "No vehicle by that id"
}
```

## Delete Vehicle

---

Method: **DEL** `/vehicle/:id` (Protected)

### Example Response Object

```
1 // count of deleted vehicles
```

### Example Error Response Object

```
{
    "message": "No vehicle by that id"
}
```

## Actions

### Users Helpers

`add()` -> Creates a new user

`findById(id)` -> Returns a user by ID

`findBy(filter)` -> Returns a user by a particular filter

`findUsers(orgId)` -> Returns a list of users

<br>
<br>
<br>

### Vehicles Helpers

`add()` -> Creates a new users vehicle

`findById(id)` -> Returns a users vehicle by ID

`findBy(filter)` -> Returns a users vehicle by a particular filter

`findUsersVehicles(user_id)` -> Returns a list of a users vehicles

`updateVehicle(user_id)` -> Updates a users vehicle, returning number of updated entries

`deleteVehicle(user_id)` -> Deletes a users vehicle, returning number of deleted entries

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/labs15-rv-life/frontend/blob/master/README.md) for details on the frontend of our project.
See [Data Science Documentation](https://github.com/labs15-rv-life/data-science/blob/master/README.md) for details on the Data Science of our project.
See [iOS Documentation](https://github.com/labs15-rv-life/iOS/blob/master/README.md) for details on the iOS Swift app of our project.
