|  Route |  Renders | Authenticated?  |
|:---:|:---:|:---:|:---:|
|  '/' | listing_id  | Retrieve all listing features associated with the passed id |
|  '/comparison' | listing_id & feature ('property_type', 'zipcode', etc..)  | Retrieve the most popular listing that is similar to the inputed listing |
|  '/amenities' | listing_id  | Returns listing amenities and missing amenities that the most popular listings offer |
| '/percentiles | listing_id & filter ('z','p','zp') | Returns percentile count based on zipcode, property, or both |