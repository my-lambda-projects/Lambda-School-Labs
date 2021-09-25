import pandas as pd 

# CSV data imports
df_rest = pd.read_csv('CSVs/rest_stop_api.csv')
df_walmart = pd.read_csv("CSVs/walmart_api.csv")
df_weigh = pd.read_csv("CSVs/weigh_station_api.csv")
df_tourist = pd.read_csv("CSVs/tourist_attractions_api.csv")
df_campsite = pd.read_csv("CSVs/campsites_api.csv")
df_dump = pd.read_csv("CSVs/dump_stations_api.csv")
df_clearance = pd.read_csv('CSVs/low_clearances.csv')