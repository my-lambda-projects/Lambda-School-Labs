# Quilly API
# ===User endpoints===
## ---Register new user---
* **Description:** Registers a new user

* #### URL:      ```/user/register```
* #### Method:   ```POST```

* **URL Params:** None

**Data Params:** <br/>

|Name        |Type       |Required (Y/N)|
|------------|-----------|--------------|
|username    |string     |Y             |
|password    |string     |Y             |
|email       |string     |Y             |
|fisrtname   |string     |Y             |
|lastname    |string     |Y             |


### Success Response
* **Code:** 201 <br/>
**Content:** 
```
{
    _id: [string],
    username: [string],
    email: [string],
    firstname: [string],
    lastname: [string],
    createdAt: [timestamp]
}
```

### Error Response
* **Code:** 422 <br/>
**Content:** ```{ error: 'User already exists }```

* **Code:** 422 <br/>
**Content:** ```{ error: 'New user could not be created. A unqique email address is required.' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'New user could not be created' }```


## ---Get User Information---
* **Description:** Returns information associated with logged in user including associated applications, contributions and meetups

* #### URL:      ```/user```
* #### Method:   ```GET```

* **URL Params:** None

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```
{
    _id: [string],
    username: [string],
    email: [string],
    firstname: [string],
    lastname: [string],
    createdAt: [timestamp],
    applications: [{application}],
    contributions: [{contribution}],
    meetups: [{meetup}]
}
```

### Error Response
* **Code:** 400 <br/>
**Content:** ``` { error:'You must be logged in to do this function' } ```

* **Code:** 500 <br/>
**Content:** ``` { error: 'Could not retrieve user information' } ```



## ---Login---
**Description:** Logs in an exsisting user

* #### URL:      ```/user/login```
* #### Method:   ```POST```

* **URL Params:** None

**Data Params:**

|Name        |Type       |Required (Y/N)|
|------------|-----------|--------------|
|username    |string     |Y             |
|password    |string     |Y             |


### Success Response
* **Code:** 200 <br/>
**Content:** 
```{ message: 'Login successful' }```

### Error Response
* **Code:** 422 <br/>
**Content:** 
```{ error: 'Invalid credentials' } ```

* **Code:** 422 <br/>
**Content:** 
```{ error: 'User not found' } ```

* **Code:** 500 <br/>
**Content:** ``` { error: 'Database error' } ```



## ---Logout---
* **Description:** Logs out current user

* #### URL:      ```/user/logout```
* #### Method:   ```GET```

* **URL Params:** None

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```{ message: 'Successfully logged out' }```

### Error Response

* **Code:** 401 <br/>
**Content:** 
```{ error: 'Not logged in' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Error logging out' }```



## ---Delete User---
* **Description:** Deletes logged in user

* #### URL:      ```/user/delete```
* #### Method:   ```DELETE```

* **URL Params:** None

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```{ message: 'User has been deleted' }```

### Error Response 
* **Code:** 500 <br/>
**Content:** ```{ error: 'User does not exist'}```



## ---Update user information---
* **Description:** Updates information for logged in user

* #### URL:      ```/user/update```
* #### Method:   ```PUT```

* **URL Params:** None

**Data Params:**

|Name        |Type       |Required (Y/N)|
|------------|-----------|--------------|
|username    |string     |N             |
|password    |string     |N             |
|email       |string     |N             |
|fisrtname   |string     |N             |
|lastname    |string     |N             |


### Success Response
* **Code:** 200 <br/>
**Content:** 
```{ message: 'User information sucessfully updated' }```

### Error Response
* **Code:** 500 <br/>
**Content:** ```{ error: 'User information could not be updated' }```



# ===Application endpoints===
## ---Get all applications---
* **Description:** Returns applications associated with logged in user

* #### URL:      ```/user/applications```
* #### Method:   ```GET```

* **URL Params:** None

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```
{
    [
        {
            "submitted": false,
            "onsiteInterview": false,
            "receivedResponse": false,
            "whiteboard": false,
            "phoneInterview": false,
            "codeTest": false,
            "rejection": false,
            "offer": false,
            "open": true,
            "status": "wishlist",
            "testData": false,
            "_id": "5b5267c8d107c9405856ca10",
            "company": "Company",
            "position": "Position",
            "createdAt": "2018-07-20T22:52:56.133Z",
            "updatedAt": "2018-07-20T22:52:56.133Z",
            "__v": 0
        }
    ]
}
```

### Error Response
* **Code:** 400 <br/> 
**Content:** ```{ error:'You must be logged in to do this function' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Request could not be fulfilled.' }```



## Get a single application
* **Description:** Returns a single application with matching applicationID

* #### URL:      ```/user/applications/:applicationId```
* #### Method:   ```GET```

* **URL Params:** <br/>
**Required:** applicationId=[string] 

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```
{
    {
        "submitted": false,
        "onsiteInterview": false,
        "receivedResponse": false,
        "whiteboard": false,
        "phoneInterview": false,
        "codeTest": false,
        "rejection": false,
        "offer": false,
        "open": true,
        "status": "wishlist",
        "testData": false,
        "_id": "5b5267c8d107c9405856ca10",
        "company": "Company",
        "position": "Position",
        "createdAt": "2018-07-20T22:52:56.133Z",
        "updatedAt": "2018-07-20T22:52:56.133Z",
        "__v": 0
    }
}
```

### Error Response
* **Code:** 400 <br/> 
**Content:** ``` { error:'You must be logged in to do this function' } ```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Request could not be fulfilled.' }```


## ---Add application---
**Description:** Adds application to logged in user

* #### URL:      ```/user/applications/add```
* #### Method:   ```POST```

* **URL Params:** None

**Data Params:**

|Name                |Type       |Required (Y/N)|
|--------------------|-----------|--------------|
|company             |string     |Y             |
|position            |string     |Y             |
|submitted           |bool       |N             |
|onsiteInterview     |bool       |N             |
|recievedResponse    |bool       |N             |
|whiteboard          |bool       |N             |
|phoneInterview      |bool       |N             |
|codeTest            |bool       |N             |
|rejection           |bool       |N             |
|offer               |bool       |N             |
|open                |bool       |N             |
|status              |string     |N             |

### Success Response
* **Code:** 201 <br/>
**Content:** 
```
{
    [
        {
            "submitted": false,
            "onsiteInterview": false,
            "receivedResponse": false,
            "whiteboard": false,
            "phoneInterview": false,
            "codeTest": false,
            "rejection": false,
            "offer": false,
            "open": true,
            "status": "wishlist",
            "testData": false,
            "_id": "5b5267c8d107c9405856ca10",
            "company": "Company",
            "position": "Position",
            "createdAt": "2018-07-20T22:52:56.133Z",
            "updatedAt": "2018-07-20T22:52:56.133Z",
            "__v": 0
        }
    ]
}
```

### Error Response
* **Code:** 422 <br/>
**Content:** 
```{ error: 'company and position are required' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Application creation failed' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Failed to save the document.' }```



## ---Delete application---
**Description:** Deletes application matching applicationId

* #### URL:      ```/user/applications/delete/:applicationId```
* #### Method:   ```DELETE```

* **URL Params:**<br/>
**Required:** applicationId=[string] 

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```{ message: 'Application successfully deleted' }```

### Error Response
* **Code:** 500 <br/>
**Content:** ```{ error: 'Ref not deleted' }```
* **Code:** 500 <br/>
**Content:** ```{ error: 'Delete failed' }```



## ---Change application information---
* **Description:** Changes appication information for application matching applicationId

* #### URL:      ```/user/applications/update/:applicationId```
* #### Method:   ```PUT```

* **URL Params:** <br/>
**Required:** applicationId=[string]

**Data Params:**

|Name                |Type       |Required (Y/N)|
|--------------------|-----------|--------------|
|company             |string     |N             |
|position            |string     |N             |
|submitted           |bool       |N             |
|onsiteInterview     |bool       |N             |
|recievedResponse    |bool       |N             |
|whiteboard          |bool       |N             |
|phoneInterview      |bool       |N             |
|codeTest            |bool       |N             |
|rejection           |bool       |N             |
|offer               |bool       |N             |
|open                |bool       |N             |
|status              |string     |N             |

### Success Response
* **Code: 201** <br/>
**Content:** 
```{ message: 'Application Successfully updated' }```

### Error Response
* **Code:** 500 <br/>
**Content:** ```{ error: 'Failed to update' }```



# ===Meetups endpoints===

## ---Get all meetups---
* **Description:** Returns meetups associated with logged in user

* #### URL:      ```/user/meetups```
* #### Method:   ```GET```

* **URL Params:** None

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```
[
    {
        "_id": "5b55e61e9742c910b4931eb8",
        "date": "2019-04-26T04:00:00.000Z",
        "activity": "JS Meetup group",
        "__v": 0
    }
]
```

### Error Response
* **Code:** 400 <br/> 
**Content:** ``` { error: 'You must be logged in to do this function' } ```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Request could not be fulfilled' }```



## ---Get a single meetup---
* **Description:** Returns a single meetup with matching meetupId

* #### URL:      ```/user/meetup/:meetupId```
* #### Method:   ```GET```

* **URL Params:** <br/>
**Required:** meetupId=[string] 

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```
{
    "_id": "5b55e61e9742c910b4931eb8",
    "date": "2019-04-26T04:00:00.000Z",
    "activity": "JS Meetup group",
    "__v": 0
}
```

### Error Response
* **Code:** 400 <br/> 
**Content:** ``` { error: 'You must be logged in to do this function' } ```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Request could not be fulfilled' }```


## ---Add meetup---
**Description:** Adds meetup to logged in user

* #### URL:      ```/user/meetups/add```
* #### Method:   ```POST```

* **URL Params:** None

**Data Params:**

|Name                |Type       |Required (Y/N)|
|--------------------|-----------|--------------|
|date                |date       |Y             |
|activity            |string     |Y             |
|link                |string     |N             |
|notes               |string     |N             |

### Success Response
* **Code:** 201 <br/>
**Content:** ```{ message: 'Meetup successfully created' }```

### Error Response
* **Code:** 422 <br/>
**Content:** 
```{ error: 'date and activity are required' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Meetup creation failed' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Failed to save the document.' }```



## ---Delete meetup---
**Description:** Deletes meetup with matching meetupId

* #### URL:      ```/user/meetup/delete/:meetupId```
* #### Method:   ```DELETE```

* **URL Params:**<br/>
**Required:** meetupId=[string] 

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** ```{ message: 'Meetup Successfully deleted' }```

### Error Response
* **Code:** 500 <br/>
**Content:** ```{ error: 'Delete failed' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Ref not deleted' }```



## ---Change meetup information---
* **Description:** Changes meetup information for  matching meetupId

* #### URL:      ```/user/meetup/update/:meetupId```
* #### Method:   ```PUT```

* **URL Params:** <br/>
**Required:** meetupId=[string]

**Data Params:**

|Name        |Type       |Required (Y/N)|
|------------|-----------|--------------|
|date        |date       |N             |
|activity    |string     |N             |
|link        |string     |N             |
|notes       |string     |N             |

### Success Response
* **Code:** 200 <br/>
**Content:** ```{ message: 'Meetup information sucessfully updated' }```

### Error Response
* **Code:** 500 <br/>
**Content:** ```{ error: 'Failed to update' }```



# ===Contributions endpoints===

## ---Get all contributions---
* **Description:** Returns contributions associated with logged in user

* #### URL:      ```/user/contributions```
* #### Method:   ```GET```

* **URL Params:** None

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```
[
    {
        "_id": "5b55e61e9742c910b4931eb8",
        "date": "2019-04-26T04:00:00.000Z",
        "contribution": "Blog Post",
        "__v": 0
    }
]
```

### Error Response
* **Code:** 400 <br/> 
**Content:** ``` { error:'You must be logged in to do this function' } ```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Request could not be fulfilled' }```



## ---Get a single contribution---
* **Description:** Returns a single contribution with matching contributionId

* #### URL:      ```/user/contributions/:contributionId```
* #### Method:   ```GET```

* **URL Params:** <br/>
**Required:** contributionId=[string] 

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** 
```
{
    "_id": "5b55e61e9742c910b4931eb8",
    "date": "2019-04-26T04:00:00.000Z",
    "contribution": "Blog Post",
    "__v": 0
}
```

### Error Response
* **Code:** 400 <br/> 
**Content:** ``` { error:'You must be logged in to do this function' } ```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Request could not be fulfilled' }```


## ---Add contribution---
**Description:** Adds a contribution to logged in user

* #### URL:      ```/user/contributions/add```
* #### Method:   ```POST```

* **URL Params:** None

**Data Params:**

|Name                |Type       |Required (Y/N)|
|--------------------|-----------|--------------|
|date                |date       |Y             |
|contribution        |string     |Y             |
|link                |string     |N             |
|notes               |string     |N             |

### Success Response
* **Code:** 201 <br/>
**Content:** ```{ message: 'Contribution successfully created' }```

### Error Response
* **Code:** 422 <br/>
**Content:** 
```{ error: 'contribution and date are required' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Contribution creation failed' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Failed to save the document.' }```



## ---Delete contribution---
**Description:** Deletes contribution with matching contributionId

* #### URL:      ```/user/contributions/delete/:contributionId```
* #### Method:   ```DELETE```

* **URL Params:**<br/>
**Required:** contributionId=[string] 

* **Data Params:** None

### Success Response
* **Code:** 200 <br/>
**Content:** ```{ message: 'Contribution Successfully deleted' }```

### Error Response
* **Code:** 500 <br/>
**Content:** ```{ error: 'Delete failed' }```

* **Code:** 500 <br/>
**Content:** ```{ error: 'Ref not deleted' }```



## ---Change contribution information---
* **Description:** Changes contribution information for  matching contributionId

* #### URL:      ```/user/contributions/update/:contributionId```
* #### Method:   ```PUT```

* **URL Params:** <br/>
**Required:** contributionId=[string]

**Data Params:**

|Name        |Type       |Required (Y/N)|
|------------|-----------|--------------|
|date        |date       |N             |
|contribution|string     |N             |
|link        |string     |N             |
|notes       |string     |N             |

### Success Response
* **Code:** 200 <br/>
**Content:** ```{ message: 'Contribution information sucessfully updated' }```

### Error Response
* **Code:** 500 <br/>
**Content:** ```{ error: 'Failed to update' }```