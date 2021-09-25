# Space Race
### CS6 Capstone Project

### To Start:
1. Fork this repo to your account.
2. Clone your forked repo to your preferred directory.


### For The Front End:
1. In the Frontend Directory, run `yarn install` or `npm install` to gather React resources.
2. Test that the dependencies are installed correctley by running `yarn start` or `npm start`. 

#### Note: It should run, but there may be errors until the back end is online.


### For The Back End:
1. In the Backend Directory, run `pipenv shell` (Note: The backend uses Python v3.6.2).
2. Once in the virtual environment, run `./manage.py install` (alternatively, you can run `py manage.py install` or `python manage.py install`), to install the backend dependencies.
3. Test that the dependencies installed correctly by running `./manage.py runserver`.

### Test The Application:
1. With dependencies for both ends installed, start by running `./manage.py runserver` in the backend directory.
2. In a new shell, run `yarn start` or `npm start` to start the React Server.


From here, the React window should open up, displaying sample data loaded from the API. You can also switch to one of the following:
* http://127.0.0.1:8000/api
* http://127.0.0.1:8000/admin
* http://127.0.0.1:8000/team

The api route will display all currently added and stored teams. The team route can be further specified by id (1, 2, 3 etc.) to display the information for a specific team.
Finally, the admin route will bring you to the Django Admin interface, where you can log in with a superuser account to manage the api.

### To log in, first create a superuser.
From the virtual environment:
Run `./manage.py createsuperuser`
It will prompt you to create a user name. Create your username and hit enter.
From there it will ask for an email. This is not necessary. Simply hit enter to skip it.
Finally, it will ask for a password. It will NOT accept common passwords, so make it unique. It will give one final prompt to confirm the password.

From there the superuser is created and you can now access the admin route! 

