# Quiz Model using Django REST framework

## Prerequistes

Assuming you do not have any merge conflicts and have the latest pull request
  1. There has been a lot of model changes so delete your **db.sqlite3** file.
  1. Under `teams/migrations` delete everything except the `__init__.py` file.
  1. Run `pipenv install`
  1. Run `pipenv shell`
  1. Run `./manage.py makemigrations` to create the models and fields for the database
  1. Run `./manage.py migrate` to create the tables in the database
  1. Run `./manage.py createsuperuser` to create a user. You must be a registered user in the database to create a quiz.
  1. To run the server type `./manage.py runserver`
  1. Go to `http://127.0.0.1:8000/admin` and login

## `GET` and `POST`
  * Go to `http://127.0.0.1:8000/api` to create a new Quiz. Remember you must be a logged in user.
    *  At the bottom of the page click on `Raw Data` to input **all** of the quiz information.
    * Here is a sample quiz to input in the field:
    ```
    {
      "name": "Test 1",
      "randomize_team": false,
      "teams": [
        {"name": "team 1"}, 
        {"name": "team 2"}, 
        {"name": "team 3"}
      ],
      "questions": [
        {
          "question":"how many days are there in a week?",
          "answers": [
            {"answer": 7, "is_correct": true},
            {"answer": 8},
            {"answer": 9},
            {"answer": 10}
          ]
          
        },
        {
          "question":"how many days are in a year?",
          "answers": [
            {"answer": 366},
            {"answer": 377},
            {"answer": 365, "is_correct": true},
            {"answer": 356}
          ]
          
        }
      ]
    }
    ```
    * Press post and you should have your first quiz published!
    * To better understand the fields please go to `teams/models.py`

## `PUT` and `DELETE`
  * Go to `http://127.0.0.1:8000/api/:id` if it is your first quiz the `id` will be 1. So simply go to `http://127.0.0.1:8000/api/1/`
  * Once again scroll to the bottom to the `Raw Data` section and alter any fields of your choosing and press `PUT`. The page should reload with the updated information.
