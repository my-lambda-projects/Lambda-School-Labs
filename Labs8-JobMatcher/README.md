# JobMatcher

Like Tinder for finding jobs. If seeker matches with employer, a connection is made and they can message one another.

Seekers and employers can spend credits to do a super app, which appears as though they had matched with only one party taking action

Job Seekers

- Start with 5 free apps (applications)
- Get plus 1 free app per day
- Max 10 free Apps stored
- After free apps are gone, spend 1 credit to app
- Spend 10 credits to super app
- Can purchase 100 credits for 10 dollars

Employers

- Start with one free posting
- Purchase additional for \$10 each
- Get 100 credits per job posted
- Get one free call per day (employer version of app/match)
- Once free calls are used, spend 1 credit to call
- Spend 10 credits to super call

Stretch Goals

- Implement in-app messaging
- Free but Premium Tier for all Lambda grads and hiring partners
- Lambda Badges on profile for grads, verified by Lambda Staff

## Local setup

1. Clone repo

1. Create `.env` file withe following content
   
   ```.env
   DEBUG=True
   SECRET_KEY=NOTSOSECRETANYMORE
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=sqlite:///db.sqlite3
   ```

1. Install virtual environment and packages using [Pipenv](https://pipenv.readthedocs.io/en/latest/)

   ```bash
   pipenv install
   ```

1. Activate virtual environment

   ```bash
   pipenv shell
   ```

1. Apply migrations

   ```bash
   pyton manage.py migrate
   ```

1. Start Django server

   ```bash
   pyton manage.py runserver
   ```


## Frontend Framework
We are using React as our frontend framework. Due to the various components that could be re-used, we chose React.

Our major frontend libraries include:
- Redux
- Redux-Persist
- Axios
- ReactStrap
- StyledComponents
- GreenSock / RTG
- BLKTheme

We have a re-usable component for our cards. Since there are many cards rendering on various pages, we created a single card that can be extended to most other pages.

## Backend Framework
As we all know, we’re using Django and DRF for our backend. Django is a framework for web dev applications and DRF is library for creating API.

Given that there were no requirements for dynamic data, we decided that a relational database would suffice. Postgres was a relational DB and also had the Array Field type that we thought could be useful for our Skills field. Django offered a robust ORM for Postgres


Creating multiple user:
https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html

Having independent tables and having relations seems like a better fit 

In our Django project we have one project called Job Matcher. Within this project we have a few apps:
- JobMatcherApp
- jobs
- billing
- send

Ideally, each app could allow for various people to work on various parts of a project without stepping on each other’s toes.

Each app is made up the following files (migration is the only folder)
- Migrations
- Admin
- Urls
- View
- Models

Models seem like the place to start (for me). It’s where you define your tables. Each row in the table is known as an instance. This word is used throughout the Django and DRF documentation

Once your models are defined, you would run makemigrations to make the migration files. The migration files are the actual commands to create the schema of the table or model. Running migrate applies those migrations to the Model.

Now that the models are in place, we can start to look at the request and responses from the client (frontend).


### Requests  / Responses
This diagram is ugly.. But we’ll try and walk though it step by step:

https://docs.google.com/drawings/d/1Gq-G-UGtOmksNQebtll3BKxUdzQ9lPGQb9A_zdzXDiQ/edit

Everything starts with a request from the client. We know that we have authentication. This was provided by a 3rd part library for OAuth, specifically OAuth2 provider

Normally this authentication is set in the settings.py file. We have two settings there:

- DEFAULT_PERMISSION_CLASSES
- DEFAULT_AUTHENTICATION_CLASSES


The authentication handles the initial authentication and the permissions handles all subsequent requests. We know that we sign_up wont have authentication as its set up after this call.

This call returns a Bearer token and this token is placed in all future calls.

DRF give us access to request.user and request.data. These two are used throughout the request’s lifetime. 

The viewSets are the things that handle the requests/responses. They take in requests and respond with responses.

The serializer offer us a way to create/update/validate data into the database. There are 3 types of serializers we used in the project:

There are two main methods in the serializer. Update and Create. When getting a request from the client, we may have to update data or create data. 

The instance is just a fancy word for row in the table:

Create instance using serializer:
- JobSerializer(data)
- is.valid()
- save()

Updating instance using ser;
- JobSerializer(data,instance)
- is.valid()
- save()

Representing an instance/queryset using ser:
- JobSerializer(instance).data()
- JobSerializer(queryset, many).data()


Representation is the opposite of the instance. The representation is the JSON format that is needed to send back to the client. 

### Mailgun Integration
We have been able to integrate the Mailgun for our 3rd party Email service.

### API Documentation
We have a fully documented API using the Swagger docs.
https://stage.api.seekgeek.app/docs/

This documentation allows the user to see all endpoints and what is required on the endpoints.

### Deployment / Continuous Integration

We currently have continuous integration / continuous development / continuous deployment. I’m not sure the exact differences, but in my mind, we make a change on a branch, it automatically deploys. This IMO is so dope!

When you buy a domain, you tell Netlify and Heroku where you primary domain is. The mapping listed in the second diagram is done in netlify and Heroku respectively.

## Regression Testing Steps

### Authentication
Sign Up
- Test if the fields validate correctly
- Test if after signing up you are routed to the /seek/ page

Sign In
- Test if you can login
- Test Faker accounts login
- n@seeker.com where n is between (1,99)
- n@employer.com where n is between (1,9)
- All passwords are 5555555555

### Features
Seek
- Test if you can Skip/ Super/Apply
- Test if the card changes
- Test if the metrics updates
- Test if the card displays the title/summary
- Test if you can read more and it flips the card
- Test if the profile pics and summary are rendering correctly

Matches
- Test if you Matches are displayed
- Test if you can open the card and see details
- Test if you can send an email

Job
- Test if you can view the jobs
- Test if you can add a job
- Test if you can edit a job

Profile
- Test that you can view the profile
- Test that you can change any field
- Test that you can change the password
	

## Security
Our application has multiple levels of security
- When a user signs up, token is stored in Local Storage and Redux
- Frontend - all pages are protected
- Each request to the backend must have a OAuth Token in the header
- Our app is registered app as multiple apps can use our frontend
