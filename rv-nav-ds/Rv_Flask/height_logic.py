import pandas as pd 

#from utilities.coords import reduce_dataframe, coord_to_square, miles_to_coord
from utils.coords import Coords as cr

def get_low_clearances(user_height, dataframe, height_feature):

    no_clearance = []

    for i in dataframe[height_feature]:
        boolean = user_height < i
        no_clearance.append(boolean)

    dataframe['pass_through'] = no_clearance

    df = dataframe.loc[dataframe['pass_through'] == False]

    return df

def location_finder(df, latitude, longitude, radius):
    """
    Returns places of interest within a designated area for a users specific geographic coordinates.
    
    Parameters:
        df (Pandas DataFrame): DataFrame containing places of interest and their corresponding lat/long coordinates
        latitude (Float value): Users designated latitude
        longitude (Float value): Users designated longitude
        radius (Int): Value that determines the search area for designated place of interest
        
    Returns:
        df (Pandas DataFrame): DataFrame containing only the places of interest that are within the user's designated search area
    
    
    """
    coord_dist = cr.miles_to_coord(radius)
    lat_plus, lat_minus, long_plus, long_minus = cr.coord_to_square(latitude, longitude, coord_dist)

    long_list = cr.reduce_dataframe(df, 'longitude', long_plus, long_minus)
    df_reduced = df.loc[df['longitude'].isin(long_list)]

    lat_list = cr.reduce_dataframe(df_reduced, 'latitude', lat_plus, lat_minus)
    df_final = df_reduced.loc[df_reduced['latitude'].isin(lat_list)]
    
    return df_final