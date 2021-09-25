#Lambda Maps
###Requirements

For development, you will need Node.js, and Python 3 installed on your environement


####Configure app
#####Python
go ahead and create your virtual environment that suits you best, and install all python packages required to run the 
server from requirements.txt

```
pip install -r requirements.txt 

```

then you should be able to start up the server.
```
cd react_django/django-src && ./manage.py runserver
```
#####Node

node doesnt need anything done at this point.


####Update repo and django collections

Some packages usages might change so you should run npm prune & npm install often. A common way to update is by doing
```
git pull
npm prune
npm install
```

after updating the react project you may need to create a new production ready directory with the updated content and 
move it to the django src directory to collect the updated static files and html content an easy way to do this is with
the following commands:
```
* make sure youre in the react-src directory *
npm install or:
* run this if you have all required node modules installed *
npm run build
```


JavaScript

    JSLint is used to prevent JavaScript error.
    JSCS is used to check coding conventions.
    Browserify to handle allow us to write our client-side scripts with es6 syntax thanks to es6ify.
    React is used for UI.

CSS

    SASS is used.
    
Python

    Django is used as the MVC framework based on its mature library
    
    SQLite3 is used as the primary database at this current moment for development, 
    but there are plans in place to migrate over to PostgreSQL during production.
    
    