"""
This file (test_models.py) contains the unit tests for the models.py file.
"""
from models import users

def test_new_user(new_user):
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the email, hashed_password, and role fields are defined correctly
    """
    assert new_user.email == 'pascale123@gmail.com'
    assert new_user.password != 'FlaskIsAwesome'
    assert new_user.role == 'user'
    

def test_new_country(country_added):
    """
    GIVEN a Country model
    WHEN a new Country is created
    THEN check the name, flag, image and code are defined correctly
    """
    assert isinstance(country_added.country_name, str)
    assert isinstance(country_added.flag, str) 
    assert isinstance(country_added.country_img, str)  
    assert isinstance(country_added.code, str) 


def test_friends_with(friends_with_table):
    """
    GIVEN a Friends_with model
    WHEN a new friends_with instance is created 
    """
    assert isinstance(friends_with_table.status, bool)
 

