# Flask API

The construction of this API serves two primary purposes for the RV Life project. 

url:   ```dr7ajalnlvq7c.cloudfront.net```

## Routing

The routing api routes will return obstructions for a user's vehicle that could be encountered within that user's designated trip.

### Low clearances

Given a user's vehicle height, fetch_low_clearance will return the coordinates of roadways that are too low for the vehicle to pass through.

```/fetch_low_clearance``` <br>
```post request```

Example request:
```
{
    "height": 13,
    "start_lon": -80.8431,
    "start_lat": 35.2271,
    "end_lon": -84.3880,
    "end_lat": 33.7490
}
```

## Places of Interest

The places of interest api routes will return the coordinates of user specified places of interest that are within the users desired range (in miles).

```
Post requests:

/fetch_walmart
/fetch_rest_area
/fetch_weigh_station
/fetch_tourist_sites
/fetch_campsite
/fetch_dump_station
``` 

Example request:
```
{
    "latitude":  35.2271,
    "longitude": -80.8431,
    "distance": 5
}
```






