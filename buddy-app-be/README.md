# Buddy App v1.0

<p align="center">
    <img src="https://i.imgur.com/5whhrre.png"
        height="130">
</p>

##### Backend deployed at: [https://buddy-app-be.herokuapp.com/](https://buddy-app-be.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Backend framework

The backend framework used for this project was **Express**

Using Express...

- made it fast and easy to set up
- allowed us to create RESTful API
- made it easy to connect to SQL servers
- made it easy to incorporate middleware

## Endpoints

#### Auth Routes

| Method | Endpoint       | Access Control | Description                                      |
| ------ | -------------- | -------------- | ------------------------------------------------ |
| POST   | `/auth/signin` | all users      | Returns info for the logged in user and a token. |
| POST   | `/auth/signup` | all users      | Creates a new user and returns info and a token. |

#### User Routes

| Method | Endpoint     | Access Control | Description                       |
| ------ | ------------ | -------------- | --------------------------------- |
| GET    | `/users`     | all users      | Returns all users.                |
| GET    | `/users/:id` | all users      | Returns info for a specific user. |
| PUT    | `/users/:id` | all users      | Updates info for a specific user. |
| DELETE | `/users/:id` | all users      | Deletes a specific user.          |

#### Interest Routes

| Method | Endpoint                              | Access Control | Description                                       |
| ------ | ------------------------------------- | -------------- | ------------------------------------------------- |
| GET    | `/interests`                          | all users      | Returns all interests.                            |
| GET    | `/interests/:interestid`              | all users      | Returns an interest id and name.                  |
| GET    | `/interests/user/:userid`             | all users      | Returns all interests for a user.                 |
| POST   | `/interests/user`                     | all users      | Creates an association of an interest for a user. |
| DELETE | `/interests/user/:userid/:interestid` | all users      | Deletes an association of an interest for a user. |

#### Activity Routes

| Method | Endpoint                             | Access Control | Description                                |
| ------ | ------------------------------------ | -------------- | ------------------------------------------ |
| GET    | `/activities`                        | all users      | Returns all activities.                    |
| GET    | `/activities/:activityId`            | all users      | Returns an activity by id.                 |
| GET    | `/activities/interests/:interestId`  | all users      | Returns activities based on interest.      |
| GET    | `/activities/organizer/:organizerId` | all users      | Returns activities based on the organizer. |
| POST   | `/activities`                        | all users      | Creates a new activity.                    |
| PUT    | `/activities/:activityId`            | all users      | Updates an activity.                       |
| DELETE | `/activities/:activityId`            | all users      | Deletes an activity.                       |

#### User_Activity Routes

| Method | Endpoint                                           | Access Control | Description                                           |
| ------ | -------------------------------------------------- | -------------- | ----------------------------------------------------- |
| GET    | `/useractivities/`                                 | all users      | Returns all user/activity pairs.                      |
| GET    | `/useractivities/user/:user_id`                    | all users      | Returns all activity ids a user has joined.           |
| GET    | `/useractivities/activities/:user_id`              | all users      | Returns all activities a user is associated with.     |
| GET    | `/useractivities/activities/notattending/:user_id` | all users      | Returns all activities a user is NOT associated with. |
| GET    | `/useractivities/activity/:activity_id`            | all users      | Returns all user ids an activity has.                 |
| POST   | `/useractivities`                                  | all users      | Creates an association for a user and an activity.    |
| DELETE | `/useractivities/:user_id/:activity_id`            | all users      | Deletes an association for a user and an activity.    |

## Data Model

#### USERS

---

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  email: STRING
  password: STRING
  location: STRING
}
```

#### ACTIVITIES

---

```
{
  id: UUID
  name: STRING
  notes: STRING
  date: STRING
  time: STRING
  guest_limit: INTEGER
  organizer_id: UUID foreign key in USERS table
  interest_id: UUID foreign key in INTERESTS table
  location: STRING
}
```

#### USER_ACTIVITIES

---

```
{
  activity_id: UUID foreign key in ACTIVITIES table
  user_id: UUID foreign key in USERS table
}
```

#### INTERESTS

---

```
{
  id: UUID
  name: STRING
}
```

#### USER_INTERESTS

---

```
{
  interest_id: UUID foreign key in INTERESTS table
  user_id: UUID foreign key in USERS table
}
```

#### ACTIVITY_INTERESTS

---

```
{
  interest_id: UUID foreign key in INTERESTS table
  activity_id: UUID foreign key in ACTIVITIES table
}
```

## Actions

#### AUTH

`getUserByEmail(email)` -> Gets a user by email

`addUser(user)` -> Adds a user

#### USERS

`getUsers()` -> Returns all users

`getUserById(id)` -> Returns a single user by ID

`updateUser(id, user)` -> Updates a single user by ID

`deleteUser(id)` -> Deletes a single user by ID

#### ACTIVITIES

`getActivities()` -> Returns all activities

`getActivityById(id)` -> Returns a single activity by ID

`getActivitiesByInterests(interest_id)` -> Returns activities by interest ID

`getActivitiesByOrganizer(organizer_id)` -> Returns activities by organizer ID

`addActivity(activity)` -> Adds an activity

`updateActivity(id, activity)` -> Updates a single activity by ID

`deleteActivity(id)` -> Deletes a single activity by ID

#### USER_ACTIVITIES

`getAllActivities(user_id)` -> Returns all activities as user is associated with (joined or created) by user ID

`getAllUserActivities()` -> Returns all user_activities

`getUserActivitiesByUserId(user_id)` -> Return user_activities by user ID (used to get activities join by a user)

`getUserActivitiesByActivityId(activity_id)` -> Return user_activites by activity ID (user to get the number of users joined for a specific activity)

`addUserActivity(userActivity)` -> Adds a user_activity (used to join an activity)

`deleteUserActivity(user_id, activity_id)` -> Deletes a user_activity (used to leave an activity)

`getAllActivitiesNotAssociatedWithId(user_id)` -> Returns all activities a user is not associated with by user ID

#### INTERESTS

`getInterests()` -> Returns all interests

`getInterestById(id)` -> Returns a single interest by ID

`getUserInterests(user_id)` -> Returns all user_interests by user ID

`addUserInterest(userInterest)` -> Adds a user_interest (used to add interests for a user)

`deleteUserInterest(user_id, interest_id)` -> Delets a user_interest (used to remove interests for a user)

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- JWT_SECRET - set a specific secret
- DB_ENV - set to "development" until ready for "production", also sets to "testing" when running tests
- PORT - used when hosting the server or set to "5000" for development

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

See [Frontend Documentation](https://github.com/Lambda-School-Labs/buddy-app-fe) for details on the frontend of our project.
