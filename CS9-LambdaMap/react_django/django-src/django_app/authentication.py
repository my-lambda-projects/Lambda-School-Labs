import jwt, datetime
from decouple import config

secret = config('SECRET')


def create_token():
    return jwt.encode({'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)}, secret)


def verify_token(jwt_key):
    try:
        return jwt.decode(jwt_key, secret, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return False
