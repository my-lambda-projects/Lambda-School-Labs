
# API Guide
This is a guide for Airbnb's web team to access the database. 

URL: LabsAirbnb-env-dev.us-west-1.elasticbeanstalk.com

## Routes

|  Route |  Receives | Returns  | Format |
|:---:|:---:|:---:|:---:|
|  '/data' | listing_id  | Retrieve all listing features associated with the passed id | list[json] |
|  '/comparison' | listing_id & feature ('property_type', 'zipcode', etc..)  | Retrieve the most popular listing that is similar to the inputed listing | list[json] |
|  '/amenities' | listing_id  | Returns listing amenities and missing amenities that the most popular listings offer | list[json] |
| '/percentiles | listing_id & filter ('z','p','zp') | Returns percentile count based on zipcode, property, or both | list[json] |

## Examples

### '/data'
Request- 
http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/data?id=6780321

Response - [{"id": 6780321, "url": "https://www.airbnb.com/rooms/6780321", "name": "Charming Minnesota Lake Cabin", "summary": "...

### '/comparison'
Request- 
http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/comparison?id=6780321&feature=property_type

Response - [{"id": 12571309, "url": "https://www.airbnb.com/rooms/12571309", "name": "Urban Retreat near Link Light Rail", "summary": "Clean, quiet,...


### '/amenities'
Request- 
http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/amenities?id=20685563

Response - {"lacking_amenities": ["Wifi", "Air conditioning", "Elevator", "Heating", "Washer", "Dryer", "Essentials", "Shampoo", "Hangers", "Hair dryer", "Laptop friendly workspace", "TV", "Kitchen", "Free parking on premises", "Gym", "Smoke detector", "Carbon monoxide detector", "Lock on bedroom door", "Iron", "Pets allowed", "Self check-in", "Lockbox", ...

### '/percentiles'
Request- 
http://labsairbnb-env-dev.us-west-1.elasticbeanstalk.com/percentiles?id=20685563&filter=z

Response - {"total_listings": [660, 534, 635, 685, 634, 525, 699, 552, 703, 5], "filter": "z", "pricing_percentiles": {"precentiles": [50.0, 70.0, 85.0, 99.0, 120.0, 150.0, 175.0, 225.0, 300.0, 9000.0], "listing_percentile": 50.0}}
