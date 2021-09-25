Backend documentation via postman:
[click here](https://labs9-dev-profiles.postman.co/collections/5974950-e056342f-7c99-46a3-a9af-f00c8f500ac8?workspace=9fb9d5d7-bdfb-4076-b7d7-2b7fdb9fd55d#b5126b23-9bc6-4989-bacb-ac1a4319dd89)

create adds to word bank
add modifies the user refrence

Endpoints:
  USERS
    DONE Create new skill - add to skills table for top_skills
    NEED add_skills
    NEED familiar_skills
    NEED places
  KEYWORDS
    DONE Return all skills in skills table
    NEED Return all places in place table
    NO Delete or edit in skills table

    Create, return, update, delete  - user skills array  1, 4, 5  that refrences skills table id

Initializing server:
    - set up .env file to ENV=development
    - 'knex migration:latest'
    - 'knex seed:run'

To run server:
    -  navigate to the /backend folder
    - 'yarn install'
    - 'yarn dev' OR 'nodemon'


To run heroku logs
    -- install/login to heroku CLI
    -- 'heroku logs --tail -a developer-profiles'

# To use the API
## GET endpoints
* `/users` - get all users
* `/users/email` - get specific user by email, for example:
     > `/users/jobob@hotmail.com`
* `users/id/skills/type` - shows all skills of specified type for given user (type options: familiar, top_skills, add_skills)
    >`/users/2/top_skills`
* `/list/skills` - retrieves complete skill bank
* `users/id/extras` - retrieves all of a given users projects, education or experience, contingent on the keyword used in place of `extras`:
    >`/users/1/projects`

## POST endpoints
* `/users/new` - to create a new user, expects `first_name, last_name, email` in the body
   >
      {"first_name": "Jane",
      "last_name": "Doe",
      "email": "janedoe@email.com"}
* `users/id/addskills/type` - adds a skill to the user already in the skill bank. expects user id and skill type in params and skill id in req.body
    >`/users/3/addskills/familiar`
    >
      {"id": "12"}  
* `users/id/createskill/type` - adds an entirely new skill to the bank and the user. expects user id and skill type in params and new skill in req.body
    >`/users/1/createskill/topskills`
    >
      {"skill": "Django"}  
* `users/id/extras` - adds a project, education record, or experience record. expects 
    >`/users/10/projects`
    >
      {"user_id": "10", 
      "project_title": "cooltitle", 
      "project_description": "worked on this for forever"
      "link": "www.amazingproject.com", 
      "project_img": "imageurl.com"}  
    >`/users/10/education`
    >
      {"user_id": "10", 
      "job_title": "cooltitle", 
      "job_description": "i helped people do things"
      "job_dates": "sometime - someothertime"}  
    >`/users/10/experience`
    >
      {"user_id": "10", 
      "school": "coolschool", 
      "school_dates": "sometime - someothertime"
      "degree": "whateva", 
      "course": "fsw"}  
## PUT endpoints
### note: skills are not editable or deletable in order to prevent one user from changing a skill on all other user profiles. in the real world we probably want some kind of filter for skills in the first place to limit inappropriate entries-- just in case
* `users/id` - edits values on the user table, expects id in params and column/row value in req.body
    >`/users/4`
    >
    {
        "first_name": "Bob", 
        "acclaim": "changebadge.acclaim.com"
    } 

* `users/id/extras/extrasID` - edits values on a project/education/experience record. expects both user id and the id of the project/experience/education entry in params. expects column/row data to be edited on req.body
    >`/users/4/projects/1`
    >
      {"project_title": "somethingnew", 
      "project_image": "coolbeansurl.jpg"} 
## DELETE endpoints
* `users/id` - deletes user entirely
* `users/id/extras/extrasID` - deletes project/experience/education entry entirely
    >`/users/5/projects/1`

TODO change keys refrence in routes to api