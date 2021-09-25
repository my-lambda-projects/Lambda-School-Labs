from sqlalchemy import func
import json
from models import users, countries
from server import app, connect_to_db, db
from dotenv import load_dotenv
import os

def load_users(user_filename):
    for i, row in enumerate(open(user_filename)):
        if row[0]!='i':
            row = row.rstrip()
            user_id, username, password, first_name, last_name, age, nationality, picture_url, email, role, home_country, fb_user_id, fb_access_token, premium = row.split(",")

            user = users(username=username, password=password, first_name=first_name, last_name=last_name,
            age=age, nationality=nationality, picture_url=picture_url, email=email, role=role, home_country=home_country, fb_user_id=fb_user_id, fb_access_token=fb_access_token, premium=premium)

            db.session.add(user)
    db.session.commit()


def load_countries(countries_filename):
    for i, row in enumerate(open(countries_filename)):
        if row[0]!='i':
            row = row.rstrip()
            country_id, country_name, flag, country_img, country_code = row.split(",")

            country = countries(country_name=country_name, flag=flag, country_img=country_img, code=country_code)

            db.session.add(country)
    db.session.commit()

if __name__ == "__main__":
    load_dotenv('.env')
    DATABASE_URL = os.environ.get("DATABASE_URL")
    connect_to_db(app, DATABASE_URL)
    with app.app_context():
        db.init_app(app)
        countries_filename = "seed_files/COUNTRY_DATA.csv"
        load_countries(countries_filename)
