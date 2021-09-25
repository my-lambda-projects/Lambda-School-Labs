

🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by. Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric. Contributing to docs does NOT count as a PR to meet your weekly requirements.


## Contributors

|                                 [Tavis Laudahl](https://github.com/tlaudahl)                                  |                               [Jasmine Charles](https://github.com/mynameisjasmine)                                |                                   [Sydney Blom](https://github.com/sydneyblom)                                   |                               [TL - Elijah McKay](https://github.com/ElijahMcKay)                                |
| :-----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|  [<img src="https://avatars0.githubusercontent.com/u/19698780" width = "200" />](https://github.com/tlaudahl)  | [<img src="https://avatars2.githubusercontent.com/u/44042194" width = "200" />](https://github.com/mynameisjasmine) | [<img src="https://avatars3.githubusercontent.com/u/36520297" width = "200" />](https://github.com/sydneyblom)  | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/ElijahMcKay)  |
|             [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/tlaudahl)              |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mynameisjasmine)             |             [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/sydneyblom)             |             [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ElijahMcKay)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |   [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)    | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |

<br>
<br>

# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Express

- Majority of the team has experience with node
- Fast and easy to get up and running

## 2️⃣ Endpoints

NOTE: There are some endpoints(marked by italics) that are not necessary because of changes made to the /userrecipe endpoints. Any post, put, or get requests can likely use the /userrecipe endpoints.

#### Seeded Recipes Routes

| Method | Endpoint                 | Access Control | Description                                 |
| ------ | ------------------------ | -------------- | ------------------------------------------- |
| GET    | `/seededRecipes/all`     | N/A            | Returns every seeded recipe in the database |
| GET    | `/seededRecipes/:id`     | N/A            | Returns seeded recipe by ID                 |
| POST   | `/seededRecipes/newseed` | N/A            | Creates a new seeded recipe                 |
| PUT    | `/seededRecipes/:id`     | N/A            | Updates seed by ID                          |
| DELETE | `/seededRecipes/:id`     | N/A            | Deletes seed by ID                          |

#### User Recipes Routes

| Method | Endpoint                  | Access Control | Description                                                                  |
| ------ | ------------------------- | -------------- | ---------------------------------------------------------------------------- |
| GET    | `/userrecipes/all`        | N/A            | Returns every seeded recipe in the database                                  |
| GET    | `/userrecipes/:recipe_id` | N/A            | Returns full user recipe by ID with ingredients and instructions             |
| POST   | `/userrecipes/newrecipe`  | N/A            | Accepts recipe with ingredients and instructions to create a new user recipe |
| DELETE | `/userrecipes/:recipe_id` | N/A            | Deletes recipe with cascading effect on instruction and ingredients          |
| PUT    | `/userrecipes/:recipe_id` | N/A            | Accepts recipe with ingredients and instructions to update all               |
| GET    | `userrecipes/:userString` | N/A            | Gets all truncated(no instructions) recipes for that user                    |

#### User Routes

| Method | Endpoint    | Access Control  | Description                                     |
| ------ | ----------- | --------------- | ----------------------------------------------- |
| POST   | `/register` | new users       | registers the users with firebase authenticaion |
| POST   | `/login`    | registerd users | logs in the user                                |

#### User Instructions

| Method | Endpoint               | Access Control | Description                                           |
| ------ | ---------------------- | -------------- | ----------------------------------------------------- |
| GET    | `/instructions/all`    | N/A            | Returns every instruction in the database             |
| _POST_ | `/instructions/add`    | N/A            | Accepts array of instructions and creates new entries |
| _PUT_  | `/instructions/update` | N/A            | Accepts array of instructions and updates entries     |
| DELETE | `/instructions/delete` | N/A            | Accepts array of instructions and deletes entries     |

#### Ingredients Routes

| Method | Endpoint                                | Access Control | Description                                      |
| ------ | --------------------------------------- | -------------- | ------------------------------------------------ |
| GET    | `/ingredients/all`                      | N/A            | Returns every ingredient in the database         |
| _GET_  | `/ingredients/:recipe_id`               | N/A            | Returns array of ingredints for indicated recipe |
| _POST_ | `/ingredients/:recipe_id/newingredient` | N/A            | Accepts array of ingredients and adds them       |
| _PUT_  | `/ingredients/:recipe_id`               | N/A            | Accepts array of ingredients to update           |
| DELETE | `/ingredients/:ingredient_id`           | N/A            | Deletes the ingredient with specified ID         |

# Data Model

#### USERS

| NAME OF HEADER | TYPE   |
| -------------- | ------ |
| id             | ID     |
| email          | string |
| username       | string |
| password       | string |

#### USER RECIPES

| NAME OF HEADER | TYPE                              |
| -------------- | --------------------------------- |
| id             | ID                                |
| title          | string                            |
| brew_type      | string                            |
| public_private | binary                            |
| water_temp     | integer                           |
| user_id        | id that references to the user id |
| coarseness     | string                            |

#### SEEDED RECIPES

| NAME OF HEADER | TYPE    |
| -------------- | ------- |
| id             | ID      |
| title          | string  |
| instructions   | string  |
| brew_type      | string  |
| water_temp     | integer |
| coarseness     | integer |

#### INSTRUCTIONS

| NAME OF HEADER          | TYPE    |
| ----------------------- | ------- |
| id                      | ID      |
| order                   | integer |
| text                    | string  |
| recipe_id (foreign key) | string  |
| duration(seconds)       | integer |

#### QUANTITY (this and the ingredients table are offten handled together)

| NAME OF HEADER              | TYPE    |
| --------------------------- | ------- |
| id                          | ID      |
| quantity                    | string  |
| recipe_id (foreign key)     | integer |
| ingredient_id (foreign key) | integer |

#### INGREDIENTS

| NAME OF HEADER | TYPE   |
| -------------- | ------ |
| id             | ID     |
| title          | string |

## 2️⃣ Actions

#### REGISTER/LOGIN (Firebase)

| ACTION NAME              | DESCRIPTION                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| `createUser()`           | sends the user information up to firebase and registers a new user |
| `checkIfAuthenticated()` | checks the user information against the firebase creds for auth    |

#### USERS (These are not used because we are not adding users to our own table)

| ACTION NAME                | DESCRIPTION                       |
| -------------------------- | --------------------------------- |
| `findAllUsers()`           | Returns all Users in the database |
| `findById(id)`             | Returns User by ID                |
| `add(user)`                | Adds User by ID                   |
| `removeUser(id)`           | Removes User by ID                |
| `findByEmail(email)`       | Finds User by Email               |
| `FindByUsername(username)` | Finds User by Username            |

#### SEEDED RECIPES

| ACTION NAME                       | DESCRIPTION                                |
| --------------------------------- | ------------------------------------------ |
| `findAllSeededRecipes()`          | Returns all seeded recipes in the database |
| `findById(id)`                    | Returns seeded recipe by ID                |
| `add(seeded_recipes)`             | Adds new seeded recipe                     |
| `removeSeededRecipe(id)`          | Removes seeded recipe by ID                |
| `updateSeededRecipe(id, changes)` | Updates seeded recipe by ID                |

#### USER RECIPES

| ACTION NAME                     | DESCRIPTION                              |
| ------------------------------- | ---------------------------------------- |
| `findAllRecipes()`              | Returns all User recipes in the database |
| `findById(id)`                  | Returns user recipe by ID                |
| `add(recipe)`                   | Adds new user recipe                     |
| `removeRecipe(id)`              | Removes user recipe by ID                |
| `updateUserRecipe(id, changes)` | Updates user recipe by ID                |
| `findPostsByUserId(user_id)`    | Updates user recipe by ID                |

#### INGREDIENTS

| ACTION NAME                                           | DESCRIPTION                                                                                                          |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `findAllIngredients()`                                | Returns all rows on ingredients table in the database                                                                |
| `findById(ingredient_title)`                          | Returns ingredient by TITLE from ingredients table(should be renamed)                                                |
| `add(ingredient)`                                     | Adds new ingredient to ingredients table                                                                             |
| `removeIngredient(id)`                                | Removes ingredient by ID                                                                                             |
| `updateIngredient(id, changes)`                       | Updates ingredients table by ID                                                                                      |
| `findByRecipe(recipe_id)`                             | Returns quantities and ingredient titles by recipe ID                                                                   |
| `checkIngredient(ingredient_title)`                   | Checks to see if the ingredient already exists by its title                                                          |
| `addQuantity(quantity, recipe_id, ingredient_title))` | calls checkIngredient() and adds ingredient to table if it does not exist, then adds row to recipe_ingredients table |
| `findByQuantity(quantity_id)`                         | returns row from recipe_ingredients by ID                                                                            |
| `updateQuantity(quantity, recipe_id, ingredient_title, quantity_id))` | calls checkIngredient() and adds ingredient to table if it does not exist, then calls updateRecipe_Ingredients()|
|`addRecipe_Ingredients(quantity, recipe_id, ingredient_id)`| adds row to recipe_ingredients table|
|`updateRecipe_Ingredients(id, quantity)` | updates row fron recipe_ingredients table by ID|
| `deleteRecipe_Ingredients(quantity_id)` | deletes row from recipe_ingredients table by ID|
|`handleArrayQuantity(operation, recipeResult, quantityArray)`| handles looping over ingredient/quantity arrays to add/update/delete|

## 3️⃣ Environment Variables

    * ENV = PORT: 6000
    * PROCFILE: Development(web npm start)
    * PROCFILE: Production(web npm install pg --save && knex migrate:rollback && knex migrate:latest && knex seed:run && node index.js)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
