from django.test import TestCase
from .models import User

# Create your tests here.

class UserTest(TestCase):
  '''Test Module for User model'''
  
  def setUp(self):
      User.objects.create(
          username='test1', first_name='Wladimir1', last_name='Fraga1', email='test1', password='password.123')
      User.objects.create(
          username='test2', first_name='Wladimir2', last_name='Fraga2', email='test2', password='password.123')

  def test_user_username(self):
        user_test1 = User.objects.get(username='test1')
        user_test2 = User.objects.get(username='test2')
        self.assertEqual(
            user_test1.get_username(), "test1")
        self.assertEqual(
            user_test2.get_username(), "test2")