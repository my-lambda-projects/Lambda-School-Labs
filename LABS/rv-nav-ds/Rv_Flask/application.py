from flask import Flask, request, render_template
from flask_json import FlaskJSON, JsonError, json_response
import os
import requests
from flask_cors import CORS
import json

from data_load import *
from height_logic import get_low_clearances, location_finder
from utils.geometry import Geometry as ge

# Elastic Beanstalk initalization
application = app = Flask(__name__)
FlaskJSON(app)
cors = CORS(app)

@app.route('/')
def root():
    """
    Testing
    """
    return "Test Successful"

@app.route('/fetch_low_clearance', methods=['POST'])
def fetch_low_clearance():
  """
  API route that receives user information and returns relevant routing datapoints
  """

  data = request.get_json(force=True)

  user_height = data['height']
  lon1 = data['start_lon']
  lat1 = data['start_lat']
  lon2 = data['end_lon']
  lat2 = data['end_lat']

  lat_med, lon_med = ge.get_med_coordinate(lon1, lat1, lon2, lat2)
  radius = ge.km_to_mile(ge.haversine(lon1, lat1, lon2, lat2))
  df = get_low_clearances(user_height, df_clearance, 'height')
  df = location_finder(df, lat_med, lon_med, radius)

  return df.to_json(orient='records')

@app.route('/fetch_walmart', methods=['POST'])
def fetch_walmart():
  """
  API route that receives user information and returns relevant routing datapoints and places of interest
  """

  data = request.get_json(force=True)

  user_lat = data['latitude'] 
  user_long = data['longitude']
  user_dist = data['distance']

  final_df = location_finder(df = df_walmart, latitude=user_lat, longitude=user_long, radius=user_dist)          

  return final_df.to_json(orient='records')

@app.route('/fetch_rest_area', methods=['POST'])
def fetch_rest_area():
  """
  API route that receives user information and returns relevant routing datapoints and places of interest
  """

  data = request.get_json(force=True)

  user_lat = data['latitude'] 
  user_long = data['longitude']
  user_dist = data['distance']

  final_df = location_finder(df = df_rest, latitude=user_lat, longitude=user_long, radius=user_dist)          

  return final_df.to_json(orient='records')

@app.route('/fetch_weigh_station', methods=['POST'])
def fetch_weigh_station():
  """
  API route that receives user information and returns relevant routing datapoints and places of interest
  """

  data = request.get_json(force=True)

  user_lat = data['latitude'] 
  user_long = data['longitude']
  user_dist = data['distance']

  final_df = location_finder(df = df_weigh, latitude=user_lat, longitude=user_long, radius=user_dist)          

  return final_df.to_json(orient='records')

@app.route('/fetch_tourist_sites', methods=['POST'])
def fetch_tourist_sites():
  """
  API route that receives user information and returns relevant routing datapoints and places of interest
  """

  data = request.get_json(force=True)

  user_lat = data['latitude'] 
  user_long = data['longitude']
  user_dist = data['distance']

  final_df = location_finder(df = df_tourist, latitude=user_lat, longitude=user_long, radius=user_dist)          

  return final_df.to_json(orient='records')

@app.route('/fetch_campsite', methods=['POST'])
def fetch_campsite():
  """
  API route that receives user information and returns relevant routing datapoints and places of interest
  """

  data = request.get_json(force=True)

  user_lat = data['latitude'] 
  user_long = data['longitude']
  user_dist = data['distance']

  final_df = location_finder(df = df_campsite, latitude=user_lat, longitude=user_long, radius=user_dist)          

  return final_df.to_json(orient='records')

@app.route('/fetch_dump_station', methods=['POST'])
def fetch_dump_station():
  """
  API route that receives user information and returns relevant routing datapoints and places of interest
  """

  data = request.get_json(force=True)

  user_lat = data['latitude'] 
  user_long = data['longitude']
  user_dist = data['distance']

  final_df = location_finder(df = df_dump, latitude=user_lat, longitude=user_long, radius=user_dist)          

  return final_df.to_json(orient='records')

if __name__ == '__main__':
        application.run()