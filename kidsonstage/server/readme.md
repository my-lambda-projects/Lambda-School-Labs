#API ROUTES

### USER ROUTES

| +/- | Command  | Path                             | Example                     | Description                                                 |
| --- | -------- | -------------------------------- | --------------------------- | ----------------------------------------------------------- |
| +   | [GET]    | 'api/users/'                     |                             | Returns all users in the DB                                 |
| +   | [GET]    | 'api/users/:id'                  | 'api/users/1'               | Returns user by user ID                                     |
| +   | [GET]    | 'api/users/class/:userClass'     | 'api/users/class/2'         | Returns all users in :userClass (admin, user, probationary) |
| +   | [GET]    | 'api/users/validated/:validated' | 'api/users/validated/false' | Returns users by activated status (true / false)            |
| +   | [POST]   | 'api/users/newUser'              |                             | Creates a new user                                          |
| +   | [PUT]    | 'api/users/update'               |                             | Updates a user                                              |
| +   | [DELETE] | 'api/users/delete'               |                             | Deletes a user                                              |

### EVENTS ROUTES

| +/- | Command  | Path                                                | Example                           | Description                                                        |
| --- | -------- | --------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| +   | [GET]    | 'api/events'                                        |                                   | Returns all events in the DB based off of userClass in req.body    |
| +   | [POST]   | 'api/events'                                        |                                   | Creates a new event                                                |
| +   | [DELETE] | 'api/events'                                        |                                   | Deletes an event                                                   |
| +   | [GET]    | 'api/events/byUser/:userId'                         | 'api/events/byUser/1'             | Returns all events by owner ID (userId)                            |
| +   | [GET]    | 'api/events/:eventId'                               | 'api/events/2'                    | Returns event by ID                                                |
| +   | [GET]    | 'api/events/:eventId/activate'                      | 'api/events/3/activate'           | Returns activated status of event                                  |
| +   | [PUT]    | 'api/events/:eventId/activate'                      | 'api/events/3/activate'           | Changes activated status - only works on successful stripe payment |
| +   | [GET]    | 'api/events/:eventId/groups'                        | 'api/events/7/groups'             | Returns all groups within specified event                          |
| +   | [POST]   | 'api/events/:eventId/groups'                        | 'api/events/7/groups'             | Creates a new group under eventId                                  |
| +   | [POST]   | 'api/events/:eventId/groups/:groupId'               | 'api/events/11/groups/6'          | Adds subscriber to group                                           |
| +   | [PUT]    | 'api/events/:eventId/groups/:groupId'               | 'api/events/11/groups/6'          | Edits info of a group under eventId                                |
| +   | [DELETE] | 'api/events/:eventId/groups/:groupId'               | 'api/events/11/groups/6'          | Deletes a group out of an event                                    |
| +   | [GET]    | 'api/events/:eventId/userId/:userId'                | 'api/events/13/userId/6'          | Returns if user is subscribed to group                             |
| +   | [DELETE] | 'api/events/:eventId/groups/:groupId/userId/:userId | 'api/events/4/groups/15/userId/8' | Deletes user as a subscriber to a group                            |
