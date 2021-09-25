import pytest
from server import *
from models import *
from server import app


@pytest.fixture(scope='module')
def new_user():
    user = users( 'pdiddy','password','pascale','pierre', 20, 'Haitian', 'http://lorempixel.com/100/100/','pascale123@gmail.com', 'user', False, 'USA')
    return user

@pytest.fixture(scope='module')
def country_added():
    country = countries('Albania','img/ALflag.png','img/ALflag.png','AL')
    return country


@pytest.fixture(scope='module')
def friends_with_table():
    friends = friends_with(1, 2,1, True)
    return friends



