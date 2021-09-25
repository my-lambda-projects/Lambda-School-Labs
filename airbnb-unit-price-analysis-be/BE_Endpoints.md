URL: https://pricemyairbnb.herokuapp.com

Shape of a listing: 
```
{
  id: 29,
  picture_url: "https://...",
  name: "Bright & Airy in Highland Park",
  city: "Brooklyn",
  room_type: "Entire home/apt",
  guests_included: 3,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  user_email: "some_cool_email@gmail.com"
}
```

| Method | Route | Receives | Returns |
| :------: | :------: | :------: | ------ |
| GET | /api | Authorization token | { msg: "Your Access Token was successfully validated!" } | YES |
| GET | /api/listings | N/A | Array of ALL listings [{}, {}...] |
| GET | /api/listings/:id | N/A | Listing with specified ID |
| POST | /api/listings/retrieve | User email | Array of listings belonging to specified user. |
| POST | /api/listings/save | Listing | Array of listings belonging to user including the newly added one. |
| DELETE | /api/listings/:id | N/A | Array of listings belonging to user with the deleted listing removed. |
| PUT | /api/listings/:id | Listing | { message: "Your listing was updated successfully." } |