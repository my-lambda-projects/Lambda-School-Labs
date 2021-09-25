# Good Work Flow

1. You can build and test anything on front end.
2.  When you are ready to test the production build, run `./manage.py collectstatic` from root to add those changes to the Django backend
   1. `./manage.py migrate` before that if you made any changes to the db