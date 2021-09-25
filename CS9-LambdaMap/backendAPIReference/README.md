# Clients Endpoints

## Retrieve all client (GET)
### http://localhost:8000/api/clients/
__retrieves all of the current clients in the system and all of their attributes__

## Update a client (PUT)
### http://localhost:8000/api/update-client/
__Update an attribute, or attributes, of a current client__

### requires: an email of the current client - throws an error if email is not registered

example PUT request:

{\
  "email":"client@maps",\
  "linkedin":"linkedin updated"\
}

This updates the linkedin attribute of a user

{\
  "email":"client@maps",\
  "linkedin":"linkedin updated",\
  "about":"about updated",\
}

This updates the linkedin attribute and about attribute of a user 


## Create a client (POST)
### http://localhost:8000/api/create-client/
__Create a new client__

### requires: an email of the current client - throws an error if email is already registered

example POST request:

{\
  "password":"new client",\
  "email":"client@maps",\
  "first_name":"first",\
  "last_name":"last",\
  "remote":"False",\
  "relocate":"True",\
  "linkedin":"linkedin",\
  "github":"github",\
  "twitter":"twitter",\
  "codepen":"codepen",\
  "portfolio_picture":"portfolioPicture",\
  "city":"city",\
  "state":"state",\
  "personal_website":"personalWebsite",\
  "phone":"111-111-1111",\
  "about":"about"\
}

## Login a client (POST)
### http://localhost:8000/api/login-client/
__Retrieve a client's current state__
### requires: an email of the current client -and the clients current password
Example POST request:


{\
  "password":"new client",\
  "email":"client@maps",\
}

## Delete a client (POST)
### http://localhost:8000/api/delete-client/
__Deletes a registered client__
### requires: an email of the current client 
Example POST request:


{\
  "email":"client@maps",\
}


# Hiring Partner Endpoints

## Retrieve all hiring partners(GET)
### http://localhost:8000/api/hire-partners/
__retrieves all of the current hiring partners in the system and all of their attributes__

## Update a hiring partner(PUT)
### http://localhost:8000/api/update-hire-partner/
__Update an attribute, or attributes, of a current hiring partner__

### requires: an email of the current hiring partner - throws an error if email is not registered

example PUT request:

{\
  "email":"partner@maps",\
  "company_name":"updated company name"\
}

This updates the company name attribute of a hiring partner

{\
  "email":"partner@maps",\
  "company_name":"updated company name"\
  "about":"about updated",\
}

This updates the company name attribute and about attribute of a hiring partner 


## Create a hiring partner(POST)
### http://localhost:8000/api/create-hire-partner/
__Create a new hiring partner__ 

### requires: an email of the current hiring partner- throws an error if email is already registered

example POST request:

{\
  "password":"new partner",\
  "email":"partner@maps",\
  "firstName":"first",\
  "lastName":"last",\
  "remote":"False",\
  "relocate":"True",\
  "linkedin":"linkedin",\
  "github":"github",\
  "twitter":"twitter",\
  "codepen":"codepen",\
  "portfolio_picture":"portfolioPicture",\
  "city":"city",\
  "state":"state",\
  "personal_website":"personalWebsite",\
  "phone":"111-111-1111",\
  "about":"about"\
}

## Login a hiring partner (POST)
### http://localhost:8000/api/login-hire-partner/
__Retrieve a hiring partner's current state__
### requires: an email of the current hiring partner - and the hiring partner's current password
Example POST request:


{\
  "password":"new partner",\
  "email":"partner@maps",\
}

## Delete a hiring partner (POST)
### http://localhost:8000/api/delete-hire-partner/
__Deletes a registered hiring partner__ 
### requires: an email of the current hiring partner 
Example POST request:


{\
  "email":"partner@maps",\
}








