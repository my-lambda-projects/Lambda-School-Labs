# Falcano

Falcano aims to be an easy to use flight log for new and seasoned pilots alike.  
Create a record of your planes and then document your flights and record your hours.  
It is easy to use, and even easier to look at. 
No need to calculate your total hours either,  
even by specific license type, we do it all for you!  
Time flies, but you won't ever lose track of your hours again with Falcano.  


## Table of Contents(#toc)
* [Tech Stack](#tech-stack)
    * [Main Tech Stack](#main-tech-stack)
    * [Front End Libraries and Frameworks](#front-end-libraries/frameworks)
    * [Back end Libraries](#back-end-libraries)
    * [CSS](#css)
    * [UI](#ui)

* [Justifications For Tech Stack Chosen](#justifications)
  
* [Basic Overview](#basic-overview)
    * [Home Page](#homepage)
    * [Flights](#flights)
    * [Aircraft](#aircraft)
    * [Instructors](#instructors)
    * [Settings](#settings)
    * [Billing](#billings)
  
* [Routes](#routes)
  
* [Setting Up](#setting-up)
    * [Prerequisites](#Prerequisites)
    * [Getting Started](#getting-started)

* [Deployment](#deployment)

* [License](#license)


## Tech-Stack

### Main-Tech-Stack

* [Django](https://www.djangoproject.com/) - Backend database management
* [React](https://reactjs.org/) - The web framework used
* [JWT](https://jwt.io/) - Used to securely transfer user tokens for authorization.
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
* [Stripe](https://stripe.com/) - Online payments company
* [PostgreSQL](https://www.postgresql.org/) - Relational Database

### Front-End-Libraries/Frameworks

* [Cloudinary](https://www.cloudinary.com)
* [Parser](https://www.npmjs.com/package/html-react-parser) - HTML to React parser
* [Helmet](https://www.npmjs.com/package/react-helmet) - manages changes to document head
* [React Chart JS 2](https://www.npmjs.com/package/react-chartjs-2) - Used for the chart on the home page
* [bootstrap](https://getbootstrap.com/) - Needed for the styling of reactstrap

### Back end libraries/frameworks
* [django rest framework](https://www.django-rest-framework.org/) - For building web API
* [django-rest-framework-jwt](https://www.django-rest-framework.org/api-guide/authentication/)
* [django-rest-framework multiple model](#https://github.com/MattBroach/DjangoRestMultipleModels)

### CSS
* [CSS Grid](#)
* [Flexbox](#https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
* [@material-ui/core](http://material-ui.com/) - Used for all the cards.
* [reactstrap](https://reactstrap.github.io) - Used for modals, and a few buttons.
* [FontAwesome](https://www.Fontawesome.com) - Icons
* index.css contains a styleguide to insure uniformity.

### UI
* Design Direction
    - Keeping in line with an aviation theme light colors with an airy design was the objective.
    - Main color are blues with accents of yellows, greens, and greys.
    - White space utilizing padding and margins were carefully considered to avoid visual overcrowd of text and graphics.

### Custom graphics
* Adobe Illustrator was used to create vector based custom graphics.
    - favicon, logo, landing page background, sign-in background, sign-up background, home page illustration, default flights image, default aircraft image, default instructors image, billing page background and illustration, settings background and illustration were all created with Adobe Illustrator. 
    - If no photos are uploaded custom default graphics will be shown for Flights, Aircraft and Instructor pages.

## Justifications

 * Django
    - There were a few reasons behind choosing Django for this project. 
    - First and foremost Django has a robust admin interface that makes creating and managing data/users easy and simple to use
    - Django also comes with SQL out of the box, and having a SQL database would complement our data structure as we have heavily relational data.
    - Most importantly, Django is amazing and we wanted to try out new technologies that we hadn't had much experience with before.
 
* PostgreSQL
    Because our data is heavily relational, a noSQL database such as MongoDB would not be as effective. We chose postgreSQL because it is robust and comprehensive, it is also ACID compliant.

 * Reactjs
    - React is a powerful library that is excellent for building single page applications.
    - React-router also allows us to give users a seamless single page experience 

 * Heroku / Netlify 
    - This one was easy, we had used these services for back/frontend deployment before, knew they worked and were not too tricky to use.

 * Material UI
    - This was recommended to us by our PM, it ended up being a good choice. It looks clean and is relativly easy to use.

 * Reactstrap 
    - We chose to use this mostly for the modals, as we were already familiar with reactstrap's modals from the course.




## Basic-Overview
 #### HomePage  
    - Greets you with a graph of your total hours by license type split up by the specific hours flown. Which hours displayed are customizable by clicking the labels at the top of the graph.

 #### Flights  
    - Where you record your flight, with various types of hours flown, which aircraft you used, and even a space for and html snippet/link to your flight plan on [Skyvector](https://www.skyvector.com)

 #### Aircraft  
    - Where you record which plane you flew on, and where you can upload a picture of it as well if you wish.

 #### Instructors  
    - Keep track of all of your instructors information as well as a picture!

 #### Settings  
    - You can change your password here.

 #### Billing  
    - Unlock the app's premium features here!



## Routes

 * [GET/POST] api/flights/   -view a list of flights created by the user // create new flight
 * [GET/PUT/DELETE] api/flights/(flightID)/ -view a specific flight // edit a specific flight // delete a flight
 * [GET/POST] api/aircraft/  -view list of aircraft created by the user user // create new aircraft
 * [GET/PUT/DELETE] api/aircraft/(aircraftID)/ -view a specific aircraft // edit a specific aircraft // delete an aircraft
 * [GET/POST] api/instructors/ -view list of instructors created by the user // create a new instructor
 * [GET/PUT/DELTE] api/instructor/(instructorID)/ -view a specific instructor // edit a specific instructor // delete an instructor
 * [GET] api/filtedflights/(aircraftID)/ -view a list of flights for a specific aircraft
 * [POST] api/passwordchange/  -allows user to change password.
 * [GET] api/joined/ -view flights sorted by license type 
  
  
## Setting-Up

### Prerequisites

For this project install these dependencies by visting the links below.
[Django](https://docs.djangoproject.com/en/2.1/topics/install/),
[npm](https://www.npmjs.com/get-npm) 
or [yarn](https://yarnpkg.com/lang/en/docs/install),
and [pip/pipenv](https://pypi.org/project/pip/) 

### Getting-Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

1. For the frontend/react side of the project
   - open a terminal 
   - cd into the /frontend folder and type
```
yarn install
yarn start
``` 
2. for the backend/Django side
   - open a new terminal
   - cd into /backend fold, and type
```
pipenv shell
pipenv install
python manage.py runserver
python manage.py createsuperuser
```
3. Further setup:
   - After you create a super user
   - go to `http://localhost:8000/admin`
   - create a new group `default`
   - add create and delete permission for that group

4. Where to get SkyVector HTML snippits
   - go `skyvector.com`
   - upper left click `Flight Plan`
        - enter Departure and Destination airport codes
            - upper right click `Link`
            - select lower link `Image Link with Chart Snippet`


## Deployment

Deploying on the react side is relatively easy, typing `yarn build`  
while in the frontend folder will get you started, making it easy to deploy on a site like
[netlify](#https://www.netlify.com/docs/manual-deploys/)

It will be a bit more involved with the backend(Django). The link below will get you started.
[heroku](https://devcenter.heroku.com/articles/git)

### Deployed on
* Heroku for backend - https://flightloggercs10.herokuapp.com
* Netlify for frontend - https://stoic-meitner-50ac30.netlify.com/


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

