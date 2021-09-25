
# API Documentation

  
### Auth Routes
Title | Scenario
--- | ---
**URL** | `/signin`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `Auth0 sign in / sign up`
**Error Response** | **Code:** 500 <br>  **Content:**`Auth0 error`
**Notes** | *Redirects to: /callback to perform final stage of authentication.*

Title | Scenario
--- | ---
**URL** | `/callback`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `Auth0 sign in / sign up`
**Error Response** | **Code:** 500 <br>  **Content:**`Auth0 error`
**Notes** | *If user is new, it will add them to the local database before redirecting to the previously requested URL or the landing page*

Title | Scenario
--- | ---
**URL** | `/loggedIn`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `<user>`
**Error Response** | **Code:** 200 <br>  **Content:**`empty object`
**Notes** | *Searches local database for user with the correct auth_id and retrieves the stored information about that user*

Title | Scenario
--- | ---
**URL** | `/signout`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `Auth0 sign out`
**Error Response** | **Code:** 500 <br>  **Content:**`Auth0 error`
**Notes** | *destroys session*

### User Routes
Title | Scenario
--- | ---
**URL** | `/api/users/myprojects`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`body=[user id]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<user projects>`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/users/myreviews`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`body=[user id]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<user reviews>`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/users/editusername`
**Method** | **POST**
**URL Parameters** | **Required:**  <br>`body=[username]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<edited username>`
**Error Response** | **Code:** 500 <br>  **Content:**`{"error": "Please choose a different username."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/users/editprofilepic`
**Method** | **POST**
**URL Parameters** | **Required:**  <br>`body=[img_url]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<edited profile pic>`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*
  
### Project Routes
Title | Scenario
--- | ---
**URL** | `/api/projects/image-upload`
**Method** | **POST**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `<image>`
**Error Response** | **Code:** 422 <br>  **Content:**`AWS S3 Error`
**Notes** | *thumbnails generated for each upload*

Title | Scenario
--- | ---
**URL** | `/api/projects/:project_id`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`project_id=[integer]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<project>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Project not found."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** |

Title | Scenario
--- | ---
**URL** | `/api/projects/project_id/reviews`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`project_id=[integer]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<project reviews>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Project not found."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | 

Title | Scenario
--- | ---
**URL** | `/api/projects`
**Method** | **POST**
**URL Parameters** | **Required:**  <br>`body=[user id, project]`
**Success Response** | **Code:** 201 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 422 <br>  **Content:**`{"error": "Missing parameters."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated*

Title | Scenario
--- | ---
**URL** | `/api/projects/:project_id`
**Method** | **PUT**
**URL Parameters** | **Required:**  <br>`project_id=[integer]`  <br>`body=[user id, project changes]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Project not found."}`
**Error Response** | **Code:** 422 <br>  **Content:**`{"error": "Missing parameters."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/projects/:project_id`
**Method** | **DELETE**
**URL Parameters** | **Required:**  <br>`project_id=[integer]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

### Post Routes
Title | Scenario
--- | ---
**URL** | `/api/posts`
**Method** | **POST**
**URL Parameters** | **Required:**  <br>`body=[user id, project id, post]`
**Success Response** | **Code:** 201 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 403 <br>  **Content:**`{"error": "Not authorized."}`
**Error Response** | **Code:** 422 <br>  **Content:**`{"error": "Post cannot be empty."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated*

Title | Scenario
--- | ---
**URL** | `/api/posts/:post_id`
**Method** | **PUT**
**URL Parameters** | **Required:**  <br>`post_id=[integer]`  <br>`body=[user id, project id, post changes]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 403 <br>  **Content:**`{"error": "Not authorized."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/posts/:post_id`
**Method** | **DELETE**
**URL Parameters** | **Required:**  <br>`post_id=[integer]` <br>`body=[user id, project id]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 403 <br>  **Content:**`{"error": "Not authorized."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

### Review Routes
Title | Scenario
--- | ---
**URL** | `/api/reviews/:review_id`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`id=[integer]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<review>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Review not found."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** |

Title | Scenario
--- | ---
**URL** | `/api/reviews/getid/:user_id/:project_id`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`user_id=[integer]` <br>`project_id=[integer]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<review_id>`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** |

Title | Scenario
--- | ---
**URL** | `/api/reviews`
**Method** | **POST**
**URL Parameters** | **Required:**  <br>`body=[user id, project id, review]`
**Success Response** | **Code:** 201 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 403 <br>  **Content:**`{"error": "You can't review your own project."}`
**Error Response** | **Code:** 403 <br>  **Content:**`{"error": "You've already reviewed this project."}`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Project not found"}`
**Error Response** | **Code:** 422 <br>  **Content:**`{"error": "Missing parameters."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated*

Title | Scenario
--- | ---
**URL** | `/api/reviews/:review_id`
**Method** | **PUT**
**URL Parameters** | **Required:**  <br>`review_id=[integer]`  <br>`body=[user id, project id, review changes]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Review not found"}`
**Error Response** | **Code:** 422 <br>  **Content:**`{"error": "Missing parameters."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*
  
Title | Scenario
--- | ---
**URL** | `/api/reviews/:review_id`
**Method** | **DELETE**
**URL Parameters** | **Required:**  <br>`review_id=[integer]` <br>`body=[user id]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Review not found"}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/reviews/:review_id/like`
**Method** | **PUT**
**URL Parameters** | **Required:**  <br>`review_id=[integer]`  <br>`body=[user id, like]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<response>`
**Error Response** | **Code:** 403 <br>  **Content:**`{"error": "You can't like your own review."}`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Review not found"}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

### Landing Page Routes
Title | Scenario
--- | ---
**URL** | `/api/lp/projects`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `<featured projects>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Projects not found."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** |

Title | Scenario
--- | ---
**URL** | `/api/lp/makers`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `<featured makers>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Makers not found."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** |

Title | Scenario
--- | ---
**URL** | `/api/lp/reviewers`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`none`
**Success Response** | **Code:** 200 <br>  **Content:**  `<featured reviewers>`
**Error Response** | **Code:** 404 <br>  **Content:**`{"error": "Reviewers not found."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** |

### Search Routes
Title | Scenario
--- | ---
**URL** | `/api/search`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`query=[query, username]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<results>`
**Error Response** | **Code:** 400 <br>  **Content:**`{"error": "Bad request."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

### Filter Routes
Title | Scenario
--- | ---
**URL** | `/api/filter`
**Method** | **GET**
**URL Parameters** | **Required:**  <br>`query=[query]`
**Success Response** | **Code:** 200 <br>  **Content:**  `<results>`
**Error Response** | **Code:** 400 <br>  **Content:**`{"error": "Bad request."}`
**Error Response** | **Code:** 500 <br>  **Content:**`<error>`
**Notes** | *Needs to be authenticated.*