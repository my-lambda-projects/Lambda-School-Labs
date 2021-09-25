""" from django.core.urlresolvers import reverse - Appears that Django 2.0 has
done away with this, so using from django.urls import reverse instead """
"""
from django.urls import reverse
from rest_framework import status
# from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User



class AccountsTest(APITestCase):
    
    def setUp(self):
        # Instantiate a user.
        self.test_user = User.objects.create_user('testuser', 'test@example.com', 'testpassword')
        
    # self.test_user.save()
        # URL for creating an account.
        self.create_url = reverse('account-create')

    def test_create_user(self):
        
     #   Create a new user and a valid token is created with it.
        
        data = {

            'username': 'foobar',
            'email': 'foobar@example.com',
            'password': 'somepassword'
            
        }

        response = self.client.post(self.create_url , data, format='json')
        user = User.objects.latest('id')

        token = Token.objects.get(user=user)
        

        # To make sure we have two users in the database..
        self.assertEqual(User.objects.count(), 2)
        # And to return a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Additionally, we want to return the username and email upon successful creation.
        self.assertEqual(response.data['username'], data['username'])
        self.assertEqual(response.data['email'], data['email'])
        self.assertEqual(response.data['token'], token.key)
        self.assertFalse('password' in response.data)

    def test_create_user_with_short_password(self):
        
     #   Ensure user is not created for password lengths less than 8.
        
        data = {
            'username': 'foobar',
            'email': 'foobarz@example.com',
            'password': 'foo'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)

    def test_create_user_with_no_password(self):
        data = {
                'username': 'foobar',
                'email': 'foobarz@example.com',
                'password': ''
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)

    def test_create_user_with_too_long_username(self):
        data = {
            'username': 'foo'*30,
            'email': 'foobarz@example.com',
            'password': 'foobar'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)

    def test_create_user_with_no_username(self):
        data = {
                'username': '',
                'email': 'foobarz@example.com',
                'password': 'foobarz'
                }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)

    def test_create_user_with_preexisting_username(self):
        data = {
                'username': 'testuser',
                'email': 'user@example.com',
                'password': 'testuser'
                }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)

    def test_create_user_with_preexisting_email(self):
        data = {
            'username': 'testuser2',
            'email': 'test@example.com',
            'password': 'testuser'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)


    def test_create_user_with_preexisting_email(self):
        data = {
            'username': 'testuser2',
            'email': 'test@example.com',
            'password': 'testuser'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)

    def test_create_user_with_invalid_email(self):
        data = {
            'username': 'foobarbaz',
            'email':  'testing',
            'passsword': 'foobarbaz'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)

    def test_create_user_with_no_email(self):
        data = {
                'username' : 'foobar',
                'email': '',
                'password': 'foobarbaz'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data), 1)
        
"""