# Trivializer

## Intro

Trivializer helps bar trivia hosts create their question sets and answer sheets by pulling from a large and free API of trivia questions. There are free and paid tiers of the app. Users who register get a welcomeemail and can reset their password via email as well.
<br><br>
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Table of Contents

- [Team](#team)
- [Front End](#front-end)
- [Back End](#back-end)
- [Endpoints](#endpoints)

## Team

- [Alex McEvoy](https://github.com/TangledTessellations)
- [Nicky Chen](https://github.com/nchen0)
- [Sagie Gelbhauer](https://github.com/Sgoal2)
- [Chheany Mok](https://github.com/cmok4290)

## Front End:

Deployed: [Site Here](https://trivializer.netlify.com/)

- React
- Redux
- Axios
- Firebase
- React Router
- Stripe

### Back End:

- Node.js
- Express
- Knex
- Sqlite3
- Postgres
- Simplecrypt
- Mailgun

Deployed: [Site Here](https://testsdepl.herokuapp.com/)

## Reasoning:

### React.js

- Fast and responsive due to conditional rendering powered by Virtual DOM
  Uses Javascript, which has a very large user base contributing to thousands of useful dependencies and packages.
- Lightweight library vs heavy Framework like Angular
- Developers can easily make a new UI feature and see it appear in real time
- Allows for the creation of reusable components, which can be plug and played into various parts of an application.
- Good consolidation of concerns, React only deals with the front-end view components of our application, allowing us to choose more appropriate tools for our back end.

### Node.js

- Node.js’ package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
- Node’s non-blocking, asynchronous nature allows for quick interaction with our DB. As our application needed to make frequent calls to both store and retrieve information from the DB, this was essential.
- Uses Javascript, which allowed us to use one uniform language resource across both our front and back end.

### Express.js

- Allows for easy creation of back end applications by removing the need to manually create request endpoints and handling various headers from the client
- Allowed us to focus on endpoint logic, rather than verbose server calls
- Allowed for quick inclusion of various middleware to handle cross origin resource (CORS) handling, additional security features and developer tools

### SQLite

- Originally chosen because of it’s easy scalability, concurrency and control through an easily shared file system.
- SQLite works well with low traffic web sites, such as ours during development
- Relational Database worked well with how our data was logically separated
- Eventually ported over to PostGresQL due to difficulty in data retention on server

### PostGresQL

- Relational Database worked well with how our data was logically separated
  Wide array of acceptable column types allows for error checking on both inputing values and retrieving values
- Rich indexing of values allows for faster response times
- Easy scalability, with some queries enjoying the benefits of [Parallelism](https://www.postgresql.org/docs/current/parallel-query.html)

## Endpoints:

### Users Endpoints

#### GET /

- Basic endpoint to test if server is up

#### POST /register

- Takes in username, password, name, email, phone and logo
- Only requires username password, email for a complete user
- Inserts user into Users table in database
- Compiles mailgun API package based on user info
- Sends welcome email with mailgun API
- Returns JWT token, userID and paid status (0 if not paid)

#### POST /login

- Takes in username, password
- Searches Users table for existing user with utility function _getUser_, rejects request if no matches
- Decrypts existing User's password from DB, and matches it with passed in password, rejecting the request if no match
- Returns json web token, userId, and paid status

#### POST /creategame

- Verifies JWT with utility function _protected_
- Takes in username, created (date in milliseconds since Jan 1, 1970), gameName, description, played (date in milliseconds since Jan 1, 1970)
- Searches Users table with username to find that user's ID in DB, rejects request if no user found
- Assembles gamePackage with compatible fields for Games table
- Inserts game into Games table, rejecting request if error occurs
- Hits Games table to get the recently entered game, this redundant check ensures that our game was inserted
- returns the fetched game

#### PUT /editgame/:id

- Verifies JWT with utility function _protected_
- Gets game Id from params
- Gets complete edit game information from req.body
- updates game matching game ID
- Fetches newly edited game
- returns newly edited game

#### POST /games

- Gets user based on user name with utility function _getUser_
- Verifies JWT with utility function _protected_
- Joins Users and Games tables, only returning games where the user Id matches our ID from params
- Returns array of game objects, each with gameId, gamename, description, dateCreated, datePlayed (dates in milliseconds)

#### GET /rounds/:id

- Verifies JWT with utility function _protected_
- Gets all rounds based on game ID passed in params
- Joins Games and Rounds table, only returning rounds which have a gameId matching our game Id
- returns array of Round objects, each of which has roundId, roundName, numQs (number of questions), category, difficulty, type (multiple choice or True/False)

#### DELETE /round/:id

- Verifies JWT with utility function _protected_
- Delete a round based on Id passed in params
- Checks to see round Id is in Rounds table
- Deletes Round
- Returns "Round (round Id) deleted"

#### DELETE /game/:id

- Verifies JWT with utility function _protected_
- Gets game from Games table with ID
- Deletes a game based on ID passed in params
- Returns "Game (game ID) deleted"

#### POST /round

- Verifies JWT with utility function _protected_
- Takes in gameId, roundName, category, difficulty, type, questions (integer number of questions)
- Checks Games table with gameID for valid game
- Assembles roundPackage with values matching Rounds table
- Gets roundId after inserting roundsPackage, Insert into returnPackage with other relevant info
- Return returnPackage, which includes roundId, roundName, numQs, category, difficulty and type

#### PUT /round/:id

- Verifies JWT with utility function _protected_
- Updates round based on round Id passed in params
- takes in gameId, roundName, category, type, difficulty and questions (int representing number of questions)
- Updates round in Rounds table
- Returns updates round from Rounds table, which has roundId, roundName, numberofQs, category, difficulty and type

#### PUT /editq/:id

- Verifies JWT with utility function _protected_
- Takes in question ID from params
- Takes in new question info from req.body, which includes category, difficulty, type, question (string), corrrectAnswer (string), incorrectAnswers (array of strings)
- Updates questions based on ID
- Returns new question object, which includes questionId, category, difficulty, type, questions, correctAnswer, incorrectAnswers

#### PUT /edituser/:id

- Verifies JWT with utility function _protected_
- Edits a user in Users based on ID passed in params
- takes (in req.body) password, name, email, phone, logo (string URL), paid (int, 0 or 1), username
- Updates User and fetches that user based on ID
- Returns user object with userId, password, userName, name, email, phone, logo, paid

#### GET /questions/:id

- Verifies JWT with utility function _protected_
- Returns all questions for a round
- Gets round ID passed in params
- Joins Rounds table with Questions table, only returning questions where rounds_id matches our round ID
- Converts each questions _incorrect_answers_ and _answers_ values from string separated by "--" into arrays.
- Returns array of question objects, each of which has questionId, roundId, category, difficulty, type, question (string), correct_answer (string), answers (array of strings), incorrect_Answers (array of strings)

#### GET /users/:id

- Verifies JWT with utility function _protected_
- Gets a users info from Users table based on ID
- Gets ID from params
- Returns User object which includes userId, userName, password, name, email, phone, logo, creditCard, paid

#### POST /questions

- Verifies JWT with utility function _protected_
- Saves the questions for a round
- Takes in an array of question objects, each one must have rounds_id, category, difficulty, type, question, correct_answer (string), incorrect_answers (array of strings), answers (array of strings)
- Checks to see if round Id is valid
- Inserts questions array into Questions table
- Returns Postgres SQL query from Saving questions. (unused at time of writing)

#### DELETE /questions/:id

- Verifies JWT with utility function _protected_
- Deletes all questions for a given round ID
- Returns string "Questions deleted"

#### DELETE /game/:id

- Verifies JWT with utility function _protected_
- Deletes game from Games table based on game ID passed in params
- Returns "Game (game ID) deleted

#### GET /questions

- Takes in no parameters
- Gets all saved questions from the DB
- Used by PrintAll component, to get all questions and parses pertinent questions on front end
