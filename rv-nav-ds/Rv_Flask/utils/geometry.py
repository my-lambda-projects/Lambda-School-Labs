from math import radians, cos, sin, asin, sqrt

class Geometry:

    def __init__(self):
        self.init()

    def get_med_coordinate(lon1, lat1, lon2, lat2):
        lat_med = (lat1+lat2) / 2
        lon_med = (lon1+lon2) / 2

        return lat_med, lon_med


    def haversine(lon1, lat1, lon2, lat2):
        """
        Calculate the great circle distance between two points 
        on the earth (specified in decimal degrees)
        """
        # convert decimal degrees to radians 
        lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

        # haversine formula 
        dlon = lon2 - lon1 
        dlat = lat2 - lat1 
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a)) 
        r = 6371 # Radius of earth in kilometers. Use 3956 for miles
        return c * r

    def km_to_mile(distance):
        distance = distance *0.621371
        return distance