# Labs8-Cookbook
![Cookbook Logo](/cookbook/src/designs/Logo/LogoWithTextBlue.png)

## About Our App

[Watch The Demo](https://www.youtube.com/watch?v=kwAseuJUqoI&feature=youtu.be)

[Visit the Website](https://your-cookbook.us)

### Features
With Cookbook, you can save recipes from any website onto your account to view all in one place. Recipes can be scheduled for any number of dates and meal of the day. You can view all information about a recipe including scheduled time, cook time, servings, ingredients, and instructions. Recipes from **allrecipes.com** and **geniuskitchen.com** support a checklist for the list of instructions. You can also view a calendar that shows when all of your recipes are scheduled. You can reschedule recipes and copy the previous week’s recipes for easy scheduling! If you choose to support the Cookbook team by purchasing a subscription through the Settings page, you can generate a grocery list for any date range of recipes that are from **allrecipes.com** or **geniuskitchen.com**.

### Team
- Vu Cao
- Katie Gorbell
- Arthur Pisakhov
- Braden Walker


## Tech Stack

### Front End Built With:
- React.js
- Apollo Client
- LESS

### Back End Built With:
- GraphQL
- Prisma

### Reasoning:
- React.js:
    - Based on **reusable components** to build an entire app
    - Allows each team member to work on a separate component at one time
    - High performance with the **virtual DOM**
    - Powerful **dev tools** for faster debugging
    - Stable future. It’s backed by a **strong company** and has a **large community**
    - **Code is shared** between web and mobile apps

- Apollo Client:
    - Works well with React.js due to use of components
    - **Tracks `loading` and `error` states** automatically so we can easily handle each
    - Comes with an **intelligent cache** out of the box, so data is normalized and consistent across components
    - Apollo Links make the client extensible to accomodate more advanced features.
    - GraphQL Client that sends a query request to server. After server responds it will feed the data back to Apollo which will then pass it back into our frontend client(React).

- LESS:
    - **Variables** keep styling consistent and allow for easy app-wide changes
    - **Mixins** allow styling to be reused and makes code DRY
    - **Nesting** elements greatly organizes code and maximizes readability
    - Values can be calculated with **arithmetic operations**

- GraphQL:
    - GraphQL the identity is separate from how you fetch it, whereas in REST API the endpoint you call is the identity of that object.
    - Useful in our specific project because certain endpoints have different id’s based on recipe or ingredients involved.
    - Can traverse from the entry point to related data while in REST you have multiple endpoints to call to fetch these related data’s. Especially prominent in our project because many recipes will have a common ingredient amongst one another. eg; salt.

- Prisma:
    -  Prisma **supports many of the popular known databases** such as MySQL, MongoDB, PostgreSQL, etc. 
    - Prisma acts as the bridge between all the databases and the backend server, GraphQL. It can access multiple databases simultaneously and simplifies that use by letting the user read and write data to the database using their preferred programming language. 
    - Prisma analyses our database schema and **generates a user-friendly data-model** that can easily generate mutations and queries. 
    - Prisma also turns our DB into a **GraphQL API**.
    - **No boilerplate** for CRUD or filters.

## Prisma/GraphQL Flow:

1. Added data to datamodel.prisma
2. Prisma Reset
3. Deployed (except for local because of post-deploy bug)
4. Prisma.graphql changed
5. Change schema.graphql
6. Mutation and Query Resolver

## Security

### Authentication:
Authentication is handled through the 3rd party service **Auth0**. This allows users to securely sign in with a classic email and password, as well as social accounts like Facebook and Google. It is secured with **OAuth 2.0** so that users can grant limited access on their social account to our Cookbook site. It also uses **JSON Web Tokens** to securely pass information down from our front end client to our back end server.

### Authorization:
Authorization is handled with **Javascript Web Tokens** sent from the front end to our back end. Using Apollo Client, we **set the token** from Auth0 onto the request **headers** for our back end to decode on every request. Our **back end verifies the token** and **decodes** it, then places the decoded information on the server **context**. **Every query and mutation has access to the context**, so it will only return information that is available to that specific user.

### Testing:
We manually tested every pull request before merging it with our master branch using tools including **Chrome Dev Tools**, **React Dev Tools**, and **GraphQL Playground**. Every pull request was **reviewed by a team member** who did not publish the PR, **and a project manager** who would then merge the PR with the master branch. **Netlify also checks for building errors** on each pull request so we would know whether or not our current branch was safe to deploy. Any **bugs** that did result from faulty code were **noted on our Trello board** for the group to resolve.


## Installation Instructions:
Heroku Deploy: https://lambda-cookbook.herokuapp.com/   // lambda-cookbook.netlify.com
1. Heroku Login
2. heroku apps:create lambda-cookbook
3. git remote add heroku-backend https://git.heroku.com/lambda-cookbook.git
4. git subtree push --prefix Backend heroku-backend master (after every redploy)
5. Heroku Settings > Config Variables
6. Launch

### Front End Environment Variables:
REACT_APP_STRIPE_TEST_KEY="<SECRET REACT STRIPE KEY>"
REACT_APP_CURR_ENV="dev"
REACT_APP_BACKEND_URL="<DEPLOYED BACKEND>"

### Back End Environment Variables:
FRONTEND_URL="http://localhost:3000"
PRISMA_ENDPOINT="<DEPLOYED BACKEND DEVELOPER>"
PRISMA_SECRET="<SECRET PASSWORD>"
APP_SECRET="<APP SECRET PASSWORD>"
STRIPE_SECRET="<SECRET STRIPE KEY>"

## Models

### User Model:
`auth0Sub` and `email` come from the id_token provided by Auth0.
`firstName` and `lastName` are optional inputs found on the Settings page of the app.
```
type User {
 id: ID! @unique
 auth0Sub: String! @unique
 firstName: String
 lastName: String
 email: String! @unique
 isSubscribed: Boolean! @default(value: false)
 recipes: [Recipe!]! @relation(name: "UserRecipe", onDelete: CASCADE)
 subscriptions: [Subscription!]!
   @relation(name: "UserSubscription", onDelete: CASCADE)
}
```

### Recipe Model:
`prepTime` is the total preparation and cook time of a recipe.
```
type Recipe {
 id: ID! @unique
 title: String!
 prepTime: String
 servings: String
 image: String!
 url: String!
 createdBy: User! @relation(name: "UserRecipe")
 ingredients: [Ingredient!]!
   @relation(name: "RecipeIngredient", onDelete: CASCADE)
 instructions: [Instruction!]!
   @relation(name: "RecipeInstruction", onDelete: CASCADE)
 events: [Event!]! @relation(name: "RecipeEvent", onDelete: CASCADE)
}
```

### Ingredient Model:
`quantity` is a string that can take fractions.
```
type Ingredient {
 id: ID! @unique
 name: String!
 quantity: String!
 recipe: Recipe! @relation(name: "RecipeIngredient")
}
```

### Instruction Model:
```
type Instruction {
 id: ID! @unique
 stepNum: Int!
 description: String!
 isCompleted: Boolean! @default(value: false)
 recipe: Recipe! @relation(name: "RecipeInstruction")
}
```

### Event Model:
`mealType` is one of 5 values; **breakfast**, **lunch**, **dinner**, **dessert**, **snack**
```
type Event {
 id: ID! @unique
 recipe: Recipe! @relation(name: "RecipeEvent")
 date: String!
 mealType: String!
}
```

### Subscription Model:
```
type Subscription {
 id: ID! @unique
 amount: Int!
 currency: String!
 user: User! @relation(name: "UserSubscription")
 charge: String!
 createdAt: DateTime!
 updatedAt: DateTime!
}
```


## Queries

### Current User:
Returns the user from our database that matches the user on context
```
currentUser(auth0Sub: String): User
```

### Recipe:
Returns the recipe with the provided recipe ID
```
recipe(where: RecipeWhereUniqueInput!): Recipe!
```

### Recipes:
Returns all recipes that belong to the current user on context
```
recipes(where: RecipeWhereInput): [Recipe]!
```

### Instructions:
```
instructions(where: InstructionWhereInput): [Instruction]!
```

### Ingredients:
```
ingredients(where: IngredientWhereInput): [Ingredient]!
```

### Events:
Returns all events that were created by the current user on context.
```
events(where: EventWhereInput): [Event]!
```


## Mutations:

### Signup:
Gets the user info from context and stores it in the database
```
signup: User!
```

### Update User:
Updates the provided user with the provided user data
```
updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
```

### Create Subscription:
Creates a subscription using the provided Stripe token for the user on context
```
createSubscription(token: String!): Subscription!
```

### Create Recipe:
Creates a recipe with the provided info for the user on context.
```
createRecipe(
   title: String!
   prepTime: String!
   servings: String!
   image: String!
   url: String!
   mealType: String
   dates: [String]!
 ): Recipe!
```

### Delete Recipe:
Deletes the specified recipe
```
deleteRecipe(where: RecipeWhereUniqueInput!): Recipe
```

### Create Event:
Creates an event with the provided `date` and `mealType` for the provided recipe ID
```
createEvent(date: String!, mealType: String!, recipe: String!): Event
```

### Delete Event:
Deletes the event with the provided event ID
```
deleteEvent(where: EventWhereUniqueInput!): Event
```

### Create Instruction:
Creates an instruction with the provided `stepNum` and `description` for the provided recipe ID
```
createInstruction(
   stepNum: Int!
   description: String!
   recipe: String!
 ): Instruction
```

### Create Ingredient:
Creates an ingredient with the provided `name` and `quantity` for the provided recipe ID
```
createIngredient(
   name: String!
   quantity: String!
   recipe: String!
 ): Ingredient
```



## Stripe
We use Stripe API for our subscription. On front-end we use `stripe-checkout` to send with user information like credit card, name, amount charged, and send it to Stripe server. The server then sends back a token, we use that token in the back-end to create a Subscription for user, and switch user status to Subscribed.

### Free vs Premium:
Free users have full access to create recipe and schedule meals in recipes page and calendar page. Only premium users have access to Grocery List, where they can generate a list of ingredients for shopping purpose. 

## Design

### Original Wireframes

![Landing Page](/cookbook/Mockups/Balsamiq/LandingPage.png)

![Create](/cookbook/Mockups/Balsamiq/Create.png)

![Recipes](/cookbook/Mockups/Balsamiq/Recipes.png)

![SingleRecipe](/cookbook/Mockups/Balsamiq/SingleRecipe.png)

![Calendar](/cookbook/Mockups/Balsamiq/Calendar.png)

![GroceryList](/cookbook/Mockups/Balsamiq/GroceryList.png)

![Billing](/cookbook/Mockups/Balsamiq/Billing.png)

![Settings](/cookbook/Mockups/Balsamiq/Settings.png)


### Mockups

![Landing Page](/cookbook/Mockups/LandingPage.png)

![Create Page](/cookbook/Mockups/Create.png)

![Recipes Page](/cookbook/Mockups/Recipes.png)

![Calendar Page](/cookbook/Mockups/Calendar.png)

![Grocery List Page](/cookbook/Mockups/GroceryList.png)


### Overall Style and Theme
The overall style is very **round**. Components have **rounded corners**. Buttons are **pill shaped** or completely **circular** (depending on the width of the content inside). Both fonts are sans-serif and circular as well. There should be plenty of **margin and padding around all elements**. Elements that are functionally distinct should have more margin between them than elements that interact with each other. (i.e. the meal type buttons on the “Create” page are closer to the calendar than the search bar or recipe preview)

**Each page has a unique color scheme** based on the navigation bar at the top of the page. **One color takes over the page**, while the **other color should accent functional components**. For example, most of the “Create” page is red, but buttons and inputs will turn orange when hovered over. Some colors will carry over into other pages. Recipes on the “Calendar” page are dark blue for readability and consistency.

#### Image Credits:
The top image on our landing page was retrieved from the free stock photo website: pexels. The exact URL for our image can be found here:
https://www.pexels.com/photo/basil-delicious-food-ingredients-459469/

All icons on our website were created locally, or imported from the the FontAwesome library.

Lastly, the illustrations on our landing page were taken from unDraw at:
https://undraw.co/illustrations

#### Color Scheme:
- Aqua Haze `#EBF4F4`
- Heather `#BCC9D2`
- Pickled Bluewood `#343E5A`
- Roman `#DE6A5A`
- Chardonnay `#FED092`
- White Linen `#F5E9DF`

#### Fonts:
- Questrial (regular 400)
- Muli (extra-light 200, bold 700)
