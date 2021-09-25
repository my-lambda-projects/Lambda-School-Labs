import pandas as pd 

class Coords:

    def __init__(self):
        self.init()

    def reduce_dataframe(dataframe, feature, coord_plus, coord_minus):
        empty_lst = []

        for i in dataframe[feature]:
            if i < coord_plus:
                if i > coord_minus:
                    empty_lst.append(i)
        
        return empty_lst

    def coord_to_square(latitude, longitude, coord_dist):

        # Creates boundary limits on the latitude parallel
        lat_plus = latitude + coord_dist
        lat_minus = latitude - coord_dist

        # Creates boundary limits on the longitude parallel
        long_plus = longitude + coord_dist
        long_minus = longitude - coord_dist

        return lat_plus, lat_minus, long_plus, long_minus

    def miles_to_coord(distance):
        # Each lat/long degree is ~69.2 miles
        geo_dist = distance / 69.2
        geo_dist = geo_dist * .7

        return geo_dist