from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, TEXT, Boolean, String, CheckConstraint, ForeignKey, ARRAY, create_engine, and_
from flask_marshmallow import Marshmallow
from models import *
from dotenv import load_dotenv
import os
from sqlalchemy.orm import sessionmaker
import stripe
import logging

app = Flask(__name__)
CORS(app, resources={r'/api/*': {"origins": "*"}})

def connect_to_db(app, db_uri):
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_POOL_SIZE']=20
    app.config['SQLALCHEMY_POOL_TIMEOUT']=10
    app.config['SQLALCHEMY_MAX_OVERFLOW']=3
    app.config['SQLALCHEMY_POOL_RECYCLE']=3
    # app.config['CORS_HEADERS'] = '*'


load_dotenv('.env')
DATABASE_URL = os.environ.get("DATABASE_URL")
connect_to_db(app, DATABASE_URL)

# Init db & mm
db.init_app(app)
# ma = Marshmallow(app)
ma.init_app(app)

PORT = int(os.environ.get("PORT",5000))
DEBUG = "NO_DEBUG" not in os.environ

stripe_keys = {
  'secret_key': os.environ['STRIPE_SECRET_KEY'],
  'publishable_key': os.environ['STRIPE_PUBLIC_KEY']
}


stripe.api_key = stripe_keys['secret_key']

#Routes
@app.route("/api/error")
def error():
    raise Exception("Error!")

#AUTH ENDPOINTS
@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json['username']
    password = request.json['password']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    age = request.json['age']
    nationality = request.json['nationality']
    picture_url = request.json['picture_url']
    email = request.json['email']
    role = request.json['role']
    home_country = request.json['home_country']
    fb_user_id = request.json['fb_user_id']
    fb_access_token = request.json['fb_access_token']
    premium = request.json['premium']
    new_user = users(username, password, first_name, last_name, age, nationality, picture_url, email, role, home_country, fb_user_id, fb_access_token, premium)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.id)

@app.route('/api/login/fb/<fbid>', methods=['PUT'])
def fbLogin(fbid):
    user = users.query.filter(users.fb_user_id == fbid).first()
    if  request.json['fb_access_token']:
        return user_schema.jsonify(user)
    else: return print('User Name Or Password Incorrect')

#NOT SURE IF WE NEED THIS, BECAUSE WE CAN PULL THE FB_USER_ID DATA FROM THE USERS ENDPOINT.

@app.route('/api/users/fb', methods=['POST'])
def get_user_by_fbid():
    fbid = request.json['fb_user_id']
    print(fbid)
    user = users.query.filter(users.fb_user_id==fbid).first()
    return user_schema.jsonify(user)

@app.route('/api/users/fb/token', methods=['POST'])
def check_user_by_token():
    token = request.json['accessToken']
    user = users.query.filter(users.fb_access_token==token).first()

    return jsonify(user)

#USERS ENDPOINTS
@app.route('/api/users', methods =['GET'])
def get_users():
  user = users.query.all()
  user_schema = UserSchema(many = True)
  output = user_schema.dump(user).data
  return jsonify({'users' : output})

@app.route('/api/users/<int:id>', methods=['GET'])
def userId(id):
  user = users.query.get(id)
  return user_schema.jsonify(user)

@app.route('/api/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = users.query.get(id)
    user.username = request.json['username']
    user.email = request.json['email']
    user.password = request.json['password']
    user.first_name = request.json['first_name']
    user.last_name = request.json['last_name']
    user.age = request.json['age']
    user.nationality = request.json['nationality']
    user.picture_url = request.json['picture_url']
    user.role = request.json['role']
    user.fb_user_id = request.json['fb_user_id']
    user.fb_access_token = request.json['fb_access_token']
    user.premium = request.json['premium']
    db.session.commit()
    return user_schema.jsonify(user)

@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)

#FACEBOOK USERS BY ID
@app.route('/api/users/<fbid>', methods=['PUT'])
def fb_user(fbid):
    user = users.query.filter(users.fb_user_id==fbid).first()
    user.username = request.json['username']
    user.email = request.json['email']
    user.password = request.json['password']
    user.first_name = request.json['first_name']
    user.last_name = request.json['last_name']
    user.age = request.json['age']
    user.nationality = request.json['nationality']
    user.picture_url = request.json['picture_url']
    user.role = request.json['role']
    user.fb_user_id = request.json['fb_user_id']
    user.fb_access_token = request.json['fb_access_token']
    user.premium = request.json['premium']
    db.session.commit()
    return user_schema.jsonify(user)

#COUNTRIES ENDPOINTS
@app.route('/api/countries', methods=['GET'])
def country():
  country = countries.query.all()
  country_schema = CountrySchema(many = True)
  output = country_schema.dump(country).data
  return jsonify({'countries' : output})

@app.route('/api/countries/<int:id>', methods=['GET'])
def countryById(id):
  country = countries.query.get(id)
  return country_schema.jsonify(country)

@app.route('/api/countries/<int:id>', methods=['PUT'])
def update_country(id):
   country = countries.query.get(id)
   country.flag = request.json['flag']
   country.country_img = request.json['country_img']
   country.code = request.json['code']

   db.session.commit()
   return country_schema.jsonify(country)

@app.route('/api/countries', methods=['POST'])
def addCountry():
    country_name = request.json['country_name']
    flag = request.json['flag']
    country_img = request.json['country_img']
    code = request.json['code']

    new_country = countries(country_name, flag, country_img, code)
    db.session.add(new_country)
    db.session.commit()
    return jsonify(new_country.id,)

#MAPVIEW ENDPOINTS
@app.route('/api/mapview/<int:user_id>', methods=['GET'])
def mapview_by_user_id(user_id):
  user = users_countries_join.query.filter_by(user_id=user_id).all()
  return users_country_schema.jsonify(user)

@app.route('/api/mapview', methods=['POST'])
def add_mapView_data():
  user_id = request.json['user_id'] #JOIN user_id with username of specific id from users
  country_id = request.json['country_id'] #JOIN country_id with country_name in countries
  user_id = request.json['user_id']
  country_id = request.json['country_id']
  status = request.json['status']
  notes = request.json['notes']

  new_user_country = users_countries_join(user_id, country_id, status, notes)
  db.session.add(new_user_country)
  db.session.commit()
  return jsonify(new_user_country.id,new_user_country.user_id, new_user_country.country_id, new_user_country.status, new_user_country.notes)

@app.route('/api/mapview/<int:user_id>/<int:country_id>', methods=['PUT'])
def update_mapView_data(user_id, country_id):
    user_country = users_countries_join.query.filter_by(user_id=user_id, country_id=country_id).first()
    user_country.user_id = request.json['user_id']
    user_country.country_id = request.json['country_id']
    user_country.status = request.json['status']
    user_country.notes = request.json['notes']

    db.session.merge(user_country)
    db.session.commit()
    return user_country_schema.jsonify(user_country)

@app.route('/api/charge/', methods=['POST'])
def premium():
    token = request.json['token']
    return jsonify(token)

logging.getLogger('flask_cors').level = logging.DEBUG

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=PORT, debug=DEBUG)


'''MOVED THESE OUT OF THE WAY UNTIL THEY ARE USED
@app.route('/mapview/friends')
def mapViewFriends():
  return '<h1>Friendslist map info of current user</h1>'
@app.route('/friends/list')
def friendsList():
  return '<h1>Get all friends of user by ID</h1>'''
#SEE users/:id, it may be able to stand in for this endpoint
'''@app.route('/friends/list/<int:id>')
def friendsListById(id):
  return '<h1>Friends list by ID</h1>' 'user ID %d' % id'''
#WAITING on decision for FB API before writing logic for these endpoints
'''@app.route('/friends/request/send/<int:id>')
def friendRequestSend(id):
  return '<h1>Current user requests another user as a friend</h1>' 'user ID %d' % id
@app.route('/friends/request/accept/<int:id>')
def friendRequestAccept(id):
  return '<h1>Current user accepts another user as a friend</h1>' 'user ID %d' % id
@app.route('/friends/request/decline/<int:id>')
def friendRequestDecline(id):
  return '<h1>Current user decline another user as a friend</h1>' 'user ID %d' % id'''
'''@app.route('/users/<username>')
def username(username):
  return '<h1>Get all users with similar name</h1>' 'username %s' % username
  #POSSIBLY WON'T BE USED, KEEP UNTIL GROUP DECIDES TO DISCARD THEM
@app.route('/api/signout') #WILL BE CHANGED DEPENDING ON AUTH
def signout():
  session.pop('username')
  return redirect(url_for('index'))
'''
