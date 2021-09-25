# PicMe Photo Sharing Application
An application that allows users to upload photos and purchase others from friends. Features a user login system, display of personal and purchased photos, user details and billing information, and payment for credits which can be used to purchase photos.

## Frontend
The frontend is built with [React](https://reactjs.org/), [react-router](https://www.npmjs.com/package/react-router), and linked to the backend via [axios](https://www.npmjs.com/package/axios).

The application is structured with a landing page displaying a series of photos and a login/signup option. The dashboard for each user provides a way to upload a picture to their collection. It also allows users to browse photos and purchase them for their own collections. Further options allow users to view their pictures and alter their settings.

## Backend
On the server side we are using [Node](https://nodejs.org) and [Express](https://expressjs.com/) to create a series of RESTful endpoints that accommodate the database interaction necessary in the frontend user experience.

The API consists of the following endpoints:

* **/**  
  The root directory provides feedback indicating the status of the server.

## Database
For our database we are using [PostgreSQL](https://www.postgresql.org/), an open source object-relational database. The data is modeled in the following way:


user
---
`id: integer`  
`first_name: string`  
`last_name: string`  
`nick_names: string`  
`email: string`  
`password: encrypted string`  
`credits: integer`  
`image_id: integer, foreign key referencing image(id)` 


image
---
`id: integer`  
`name: string`  
`url: string`  
`timestamp: datetime type`  
`uploaded_image_user_id: integer, foreign key referencing user(id)`  


user_collection_image
---
`user_id: integer, foreign key referencing user(id)`  
`image_id: integer, foreign key referencing image(id)`  


relationship
---
`user_one_id: integer, foreign key referencing user(id)`  
`user_two_id: integer, foreign key referencing user(id)`  
`status: string,  either 'pending', 'accepted', 'declined', or 'blocked'`  
`action_user_id: integer,  user_id of the user that performed the most recent action`  