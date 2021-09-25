---

### START SERVER

-   run `yarn start`

### START DEVELOPMENT SERVER

- run `yarn develop`

### START PRODUCTION SERVER

- run `yarn server`

---

---

|Endpoint URL's| ----|
| Production: | https://production-taco.herokuapp.com/ |
| Local: | http://localhost:5555/ |
---
---
 | Endpoint Number | Description Details Index: |
|1. | [Details](#GET/users) |
|2. | [Details](#POST/users) |
|3. | [Details](#GET/users/:id) |
|4. | [Details](#GET/users/:id/info) |
|5. | [Details](#UPDATE/users/:id) |
|6. | [Details](#UPDATE/users/:id/prem) |
|7.|  [Details](#DELETE/users/:id) |
|8. | [Details](#POST/payments) |
|9. | [Details](#POST/favorites) |
|10. | [Details](#GET/favorites/:id) |
|11. | [Details](GET/favorites/search/:term) |
|12. | [Details](#DELETE/favorites/:id) |
|13. | [Details](#POST/events) |
|14. | [Details](#GET/events) |
|15. | [Details](#GET/events/:id) |
|16. | [Details](#GET/events/:id/comments) |
|17. | [Details](#UPDATE/events) |
|18. | [Details](#POST/users_friends) |
|19. | [Details](#GET/users_friends/:id) |
|20. | [Details](#DELETE/users_friends/) |
|21. | [Details](#POST/users_events) |
|22. | [Details](#UPDATE/users_events/accept) |
|23. | [Details](#DELETE/users_events/decline) |
|24. | [Details](#GET/users_events/:id) |
|25. | [Details](#GET/search/:term) |
|26. |  |
|27.  |  |
|28.   |  |
|29.   |  |
|30.   |  |
---


---

## Endpoints:

| Method | Endpoint      | Description                                                                    | Body Details #                  |
| ------ | ------------- | ----------------------------------------------------------------------------- | --------------------- |
| GET    | /users | If the user is logged in, respond with an array of all the user objects contained in the database. If the user is not logged in repond with the err code. | 1. |
| POST    | /users | Creates a `user` using the information sent inside the `body` of the request. Name and email fields are manditory. Id is automatically incremented. | 2. |
| GET    | /users/search | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the err code. Get users based off search term using fuse.js for fuzzy search. | 25. |
| GET    | users/:id | If the user is logged in, respond with an array of all the events contained in the database for a user. If the user is not logged in repond with the err code. | 3. |
| GET    | /users/:id/info | If the user is logged in, respond with an object of all the users info contained in the database. If the user is not logged in repond with the err code. | 4. |
| PUT    | /users/:id | If the user is logged in, responds with an object with the users entry that has been updated. If the user is not logged-in or does not contain the entry respond with the err code. | 5. |
| PUT    | /users/:id/prem | If the user is logged in, responds with an object with the users entry that has been updated. If the user is not logged-in or does not contain the entry respond with the err code. | 6. |
| DELETE | /users/:id | If the user is logged in, finds and deletes user. It also deletes user relationship where he is a friend in users_friends table. If the user is not logged-in or does not contain the entry respond with the err code. | 7. |
| POST    | /payments | This is where the billing API endpoint will go (Stripe Feature). Creates a `stripe.customers` using the information sent inside the `body` of the request(email, id). It then creates a charge with the amount description, currency and customenr id.  | 8. |
| POST    | /favorites | Creates a new `favorite` location using the information sent inside the `body` of the request(name, location, user_id).  Id is automatically incremented. | 9. |
| GET    | /favorites/:id |If the user is logged in, respond with an array of all the favorites contained in the database for a user. If the user is not logged in repond with the err code. | 10. |
| GET    | /favorites/search/:term |If the user is logged in, Gets favorites based off search term using fuse.js for fuzzy search. If the user is not logged in repond with the err code. | 11. |
| DELETE | /favorites/:id | If the user is logged in, finds and deletes the favorite(Currently this deletes the event based on the PK of the favorites table).  If the user is not logged-in or does not contain the entry respond with the err code. | 12. |
| POST    | /events | Creates a new `event` location using the information sent inside the `body` of the request(name, date, location, venue, author, user_id, , raiting, price, url, posters_email).  Id is automatically incremented. It first we check to see if the event already exists. After the event is created we sign up the user as someone going to the event | 13. |
| GET    | /events | If the user is logged in, respond with an array of all the events objects contained in the database.  | 14. |
| GET    | /events/:id |If the user is logged in, respond with an array of all the events contained in the database for a user. If the user is not logged in repond with the err code. | 15. |
| GET    | events/:id/comments |If the user is logged in, respond with an array of all the comments contained in the database for an event. If the user is not logged in repond with the err code. | 16. |
| UPDATE    | /events | Edits an existing `event` location using the information sent inside the `body` of the request(name, date, location, venue, author, user_id, lat, lon, img_url, raiting, price, url, posters_email). It first we check to see if the event already exists. After the event is created we sign up the user as someone going to the event | 17. |
| POST    | /users_friends | Creates a new `friends` relationship using the information sent inside the `body` of the request(user_id, friends_id ). First we made the person our friend,then we set the other person as friends with us. So 2 entries are created with each post request. Id is automatically incremented. | 18. |
| GET    | /users_friends/:id |If the user is logged in, respond with an array of all the all friends contained in the database for a particular user. If the user is not logged in repond with the err code. (could be used to get all of loggin users friends by passing in users id to the url. Can also be used to get all the friends of another user by passing in thier id to the url) | 19. |
| DELETE | users_friends/ | If the user is logged in, finds and deletes the friends .You will be removed frome you friend, and your friend will be removed from your freinds list.(2 deletes accure)  If the user is not logged-in or does not contain the entry respond with the err code. | 20. |
| POST    | /users_events | Creates a new `invitation` to join the event using the information sent inside the `body` of the request(user_id, event_id ). First check is user is already going to event. If user attemps to sign up for event he is already going to responds with a message. If the user isn't already going, the user is added to the event. Id is automatically incremented. | 21. |
| UPDATE    | /users_events/accept | Edits an existing `users_events` location using the information sent inside the `body` of the request where (user_id, event_id). It then changes the IsPending Flag to false. It then finds the current number of people attending the event and add 1 to it, because and additonal atendee is going. Then it updates the `total_users: attending` the new amount of attendees in the event with the corresponding id events. | 22. |
| DELETE | /users_events/decline | If the user is logged in, finds and deletes the the event invitation.Where (user_id, event_id). This allows the user to decline and invitation.  If the user is not logged-in or does not contain the entry respond with the err code. | 23. |
| GET    | /users_events/:id |If the user is logged in, respond with an array of all the data from each event the user is going to contained in the database. If the user is not logged in repond with the err code. | [Details](#GET/users_events/:id) |
| GET    | /users_events/:id |If the user is logged in, Get users based off search term using fuse.js for fuzzy search. If the user is not logged in repond with the err code. | [Details](#GET/search/:term) |




---



Endpoints local=http://localhost:5555/
Endpoints Production=http:///

Crud for Users Events
get
http://localhost:5555/users_events/1
```
[
    {
        "id": 1,
        "user_id": 1,
        "event_id": 1
    },
    {
        "id": 3,
        "user_id": 1,
        "event_id": 2
    }
]
```
post:
http://localhost:5555/users_events
```
[
    {
        "user_id": 2,
        "event_id": 1
    }
]
```

delete:
http://localhost:5555/users_events
```
[
    {
        "user_id": 2,
        "event_id": 1
    }
]
```
---
1. GET <a name='GET/users'></a>
/users 
example:
```
[
    {
        "id": 1,
        "name": "pebble",
        "email": "pebble@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    },
    {
        "id": 2,
        "name": "pebble2",
        "email": "pebble2@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    },
    {
        "id": 3,
        "name": "pebble3",
        "email": "pebble3@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    },
    {
        "id": 4,
        "name": "pebble4",
        "email": "pebble4@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    }
]
```
---
2. POST <a name='POST/users'></a>
/users 
_example_ :
```
{
    "name": "pebble44fbfd",
    "email": "pebbrwgfgle4@rocks.com"
}

```
_Response_
On Success Returns: 5 

the Id of the object created in the DB.
Which loks like:
```

[ { id: 5,
    name: 'pebble44fbfd',
    email: 'pebbrwgfgle4@rocks.com',
    isPremium: 0,
    phone: null,
    reminder: null,
    hard_or_soft: 'unassigned',
    heat_pref: 'unassigned',
    street_gourmet: 'unassigned' } ]
```

3. GET <a name='GET/users/:id'></a>
/users 
example: /users/:id
example response
```
 [
     {
         "id": 1,
         "name": "taco tuesday run 2",
         "email": "lanners.marshall@gmail.com",
         "user_id": 1,
         "event_id": 1,
         "location": "770 mercer street seattle wa",
         "date": "2/14/2019"
     },
     {
         "id": 2,
         "name": "wensday taco run",
         "email": "lanners.marshall@gmail.com",
         "user_id": 1,
         "event_id": 2,
         "location": "1440 4th street washington dc",
         "date": "2/20/2019"
     }
 ]
```

4. GET <a name='GET/users/:id/info'></a>
/users 
example: /users/1/info
example response
```
{
    "id": 1,
    "name": "pebble",
    "email": "pebble@rocks.com",
    "isPremium": 0,
    "phone": null,
    "reminder": null,
    "hard_or_soft": "unassigned",
    "heat_pref": "unassigned",
    "street_gourmet": "unassigned"
}
```
<!-- #UPDATE/users/:id -->
5. UPDATE <a name='UPDATE/users/:id'></a>
/users 
Values that can be modified: name, phone, reminder, hard_or_soft, heat_pref, street_gourmet.
example: /users/1
exampleInput:
```
{
        "id": 4,
        "name": "pebble4by4",
        "email": "pebble444444@rocks.com",
        "isPremium": 1,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "soft",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
}
```
example response:
_Response_
Status 200, OK;
On Success Returns: 4 

the Id of the object created in the DB.
Which looks like:
```
{ id: 4,
  name: 'pebble4by4',
  email: 'pebble444444@rocks.com',
  isPremium: 1,
  phone: null,
  reminder: null,
  hard_or_soft: 'soft',
  heat_pref: 'unassigned',
  street_gourmet: 'unassigned' 
}


```

<!-- #UPDATE/users/:id/prem -->
6. UPDATE <a name='UPDATE/users/:id/prem'></a>
/users 
Values that can be modified: isPremium.
example: /users/1/prem
exampleInput:
```
none 

```
example response:
_Response_
Status 200, OK;
On Success Returns: 1 

Which looks like:
```
{ id: '4' }
{ isPremium: 1 }
```
Id 4 is the id of he user modified, and isPremeium goes from 0 to 1
this works with the stripe implimentation.


<!-- #DELETE/users/:id -->
7. DELETE <a name='DELETE/users/:id'></a>
example: /users/4 
Values that can be modified: isPremium.
example: /users/4
exampleInput:
```
none 

```
example response:
_Response_
Status 200, OK;
On Success Returns: 1 

Which looks like:
```
simply deleted the data
```
Id 4 is the id of he user deleted.

8. POST <a name='POST/payments'></a>

9. POST <a name='POST/favorites'></a>

10. GET <a name='GET/favorites/:id'></a>
example: /favorites/1
exampleInput:
```
none 

```
example response:
_Response_
Status 200, OK;
On Success Returns: 

Which looks like:
```
[
    {
        "id": 1,
        "name": "test",
        "email": "pebble@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned",
        "location": "test",
        "user_id": 1
    }
]
```
Id 1 is the id of he user deleted.
if no value for the favorite, returns and ampty array.

11. GET <a name='GET/favorites/search/:term'></a>


12. DELETE <a name='DELETE/favorites/:id'></a>

## Technologies and Frameworks Used
###
- Dependencies
    - bcryptjs [View Dependency]()
    - body-parser [View Dependency]()
    - cors [View Dependency]()
    - dotenv [View Dependency]()
    - express [View Dependency]()
    - faker [View Dependency]()     
    - fuse.js [View Dependency]()
    - helmet [View Dependency]()
    - heroku [View Dependency]()
    - jsonwebtoken [View Dependency]()
    - knex [View Dependency]()
    - Morgan [View Dependency]()
    - multer [View Dependency]()
    - path [View Dependency]()
    - pg [View Dependency]()
    - sqlite3 [View Dependency]()
    - stripe [View Dependency]()
    - url [View Dependency]()

- Development Dependencies
    - cross-env [View Dependency]()
    - jest [View Dependency]()
    - nodemon [View Dependency]()
    - supertest [View Dependency]()


## Back-End Dependencies ```(Production)```
### ExpressJS

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. | [View Dependency](http://expressjs.com/)

### BcryptJS

Bcrypt is an adaptive hash function which adjusts the cost of hashing, which means that in the future as computers become more powerful, simply increasing the salt rounds will suffice at keeping Main Course secure due to the amount of processing time that would be required to generate all possible password combinations. | [View Dependency](https://www.npmjs.com/package/bcryptjs)

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers. | [View Dependency](https://github.com/expressjs/cors)

### Morgan

An HTTP request logging middleware used for production to easily identify bugs in routes. | [View Dependency](https://github.com/expressjs/morgan)

##Body-Parser
Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property. Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.| [Wiew Dependency](https://www.npmjs.com/package/body-parser)

### Helmet

A collection of nine smaller middleware functions that set security-related HTTP headers appropriatley. This protects Main Course from numerous well known vulnerablilites. | [View Dependency](https://helmetjs.github.io/)

### JSON Web Token

Realizing that there is not inherent benefit to using tokens over sessions, we chose to implement jwts due to the added benefit of storing the session on the client side as opposed to being in-memory. Main Course is built with the active server in mind and the potential to have the application be accessed from various devices in different locations. With this, instead of running the risk of having a session be interrupted due to data roaming, connection issues, or server side problems, we chose to store the session information on the client side. We also found this to be more efficient for our needs, as jwts eliminate the need to fetch additional information from the DB to validate the user. | [View Dependency](https://www.npmjs.com/package/jsonwebtoken)

### Stripe

A powerful, simple, and seamless payment commerce solution (Required by employer). | [View Dependency](https://stripe.com/docs/)




## Back-End Dependencies ```(Development)```


### Dotenv

Dotsenv allows us to universally set environment variables. | [View Dependency](https://www.npmjs.com/package/dot-env)

### Nodemon

Automatically restarts the server on save making production more efficient. | [View Dependency](https://nodemon.io/)


### Sqlite3

