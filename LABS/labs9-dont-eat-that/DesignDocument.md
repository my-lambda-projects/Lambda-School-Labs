Introduction 
This document is the first thing you complete as a part of your Lambda Labs project.  It will help you understand your project and plan out a technical design to implement it successfully.  

As a team, complete this document and have it approved by the Labs Director or Instructor before beginning work on the code base.

Part 1: Understanding Your Project
Idea 
As a developer, you are not directly responsible for the design of your project, but it is very important that you understand it.  The best developers are those that can help the team bridge the gap between a skeleton outlining an idea, and a real, written, and usable application.

Write three to five sentences explaining each of the following questions:

What problem does this application solve?  

There are a number of recipe sites online already, and a number of nutrition tracking websites, but we want to combine the two ideas. Don’t Eat That is designed to solve the problem of being able to upload and keep track of recipes that meet the user’s nutritional needs. In accordance with its name, it will particularly emphasize allergies: letting users filter by allergic ingredients and/or highlighting those ingredients to be avoided. 


Who are your competitors and how do they solve this problem? List at least three. 

allrecipes.com lets people upload, browse and rate recipes.

myfitnesspal.com lets people calculate the nutritional value of various recipes and use that to decide and track what they eat.

Tasty.co lets people upload and browse recipes. Has a tips section from other people that have tried the recipe.

Users
Your users are the reason you have a job.  By serving their needs, you get paid.  As a developer, you can help your designers create “little moments of wonder” as they interact with your product.  These touches, such as pictures moving when you swipe through an iPhone’s photo library, will cement your users to you.  

To do this, you must understand who they are and how they interact with your application.  This understanding will also have a direct impact on many elements of your technical solution, particularly your user accounts, database type and structure, and APIs or services required to meet your users’ needs.

Target Users:
A user with dietary restrictions or allergies that wants to save recipes suitary for their needs.

How many types of user accounts will you need for this project?  For each user account type, answer the following:

Account Type: Standard
Description: Free-subscription accounts for users with limited functionalities
Needs:.   
Create recipes, all CRUD operations (MVP)
Upload pictures of recipe? 
Nutritional breakdown (total calories) (MVP)
Search Recipes

Account Type: Premium
Description: With the paid subscription you get all the benefits of the free subscription plus some extra functionalities listed below.
Needs: 
Meal planning (calendar)
Dietary/Allergy awareness (MVP) unlimited
Nutritional goals


EXTRA FEATURES After MVP is reached
Features
Features are how your app solves your users needs.  A Minimally Viable Product (MVP) is the smallest set of features that can deliver a useful experience to your users.  It is important that you understand the features in your design including what they are and how your users will interact with them.  

List all the features found in your spec and answer the following:

Name: Create Recipe
User type: Standard
Description: Add ingredients to a recipe block where they can view the nutritional breakdown of the recipe as well as each ingredient as they add it. Also add a description.
Use Case: A user has a recipe they want to remember/create. They can assemble it and save it to their account.

Name: Edit Recipe
User type: Standard
Description: Change the ingredients or the description of a recipe.
Use Case: A user wants to modify a previously-uploaded recipe. 

Name: Delete Recipe
User type: Standard
Description: Delete a recipe.
Use Case: A user no longer wants a recipe in their collection.

Name: Allergies and Diet Tags
User type: Premium
Description: The allergy and diet tags help the user decide whether to use a recipe or not based off their personal diet and allergies.
Use Case: A user wants to know if a recipe has any ingredients they are allergic to and what diets a recipe follows. Ingredients that are in violation of user’s settings will be highlighted for easy avoidance.

Name: View Recipes
User type: Standard
Description: A page with all the recipes the user can created.
Use Case: A user wants to look at all the recipes he’s created.

Name: Search bar
User type: Standard
Description: Searches through recipes in view recipes page to find what they want.  In addition, search through other people’s recipes.
Use Case: A user wants to look through the list of recipes for a specific one with certain ingredients or name instead of scrolling through all of them one by one.

Name: Registration
User type: Standard / not even a user yet
Description: let users register a new user account
Use Case: 

Name: Login
User type: Standard
Description: let users sign into their previously-created account
Use Case: 

Name: Billing
User type: Standard
Description: let users purchase a paid subscription
Use Case: after a user register, he can click billing menu and purchase a paid subscription to use “paid subscription” functionalities/benefits

Example
Name:  Search bar
User type:  Standard

Description:  The search bar let’s users find a movie by name, instead of browsing through categories.

Use Case:  A user knows they want to watch Will Ferrell in Elf.  They click the search bar, type in “Elf”, and hit enter.  They are presented with a list of movies with “Elf” in the title, followed by those that our metadata indicates have elves in them.  



User Story
A user story is what it sounds like.  A narrative, written from the perspective of a user that describes an interaction with multiple features so that they may complete a task with the application.  A large design team may create a dozen user personas and write stories for them to help design the app.  From the perspective of a developer, it is useful to complete this exercise for your core user(s) to better understand their needs.  

Write a user story for your most common type of user interacting with the app for its central purpose.  Like all good stories, makes sure you include who, what, where, when, why, and how.

Story: Shelly is allergic to shellfish and wants to compile a list of recipes that are suitable for her dietary needs. Luckily, she just downloaded Don’t Eat That! She opens the app and sets she allergy to shellfish in the settings. Then she views a list of recipes already created by other users that don’t include shellfish. Although impressed, she doesn’t find what she’s looking for and wants to add her own. Fortunately, she sees at the bottom of her screen a button to create recipes. So she clicks it, bringing her to a modal asking her what ingredients she wants to add. First off she marks off allergies, and then she adds ingredients. She saves it and now can view the recipe anything she needs when she cooks it again! 

Example
Bob, 23, is in his first year of his first real job.  And he’s missed the bus!  If Bob is late to work again, he may be in big trouble.

Luckily, Bob just downloaded Uber!  He opens the app and is asked where he wants to go.  The autosearch window lists possible destinations as he starts typing and he’s able to pick his office after only entering three characters.  

While doing so, the map background helpfully let’s Bob know that there are no less than six Uber cars in his area. 

In a flash, the app shows the route to Bob’s office, gives him a very reasonable price, and an estimate of how long he will have to wait -AND- when he will arrive.

Just before 9AM, just in time!  Bob hit’s the confirm button and within moments, his driver arrives.  He is whisked away to work and gets there with five minutes to spare!

Part 2: Technology
The development team is responsible for choosing a technical solution to the product envisioned by the design team.  In large companies, this may be a senior engineer or someone with the word ‘architect’ in their title.  In smaller organizations, the developers themselves make the choices.  In either case, junior developers will be expected to contribution to these discussions.  Each piece of technology must be selected because it has the best balance of pros and cons to solve the given problem.

Because the team knows it, it’s easy, fast, convenient, etc. are not acceptable reasons to select a technology.

Front End
Solution: React, React Router, Redux, Styled Components, Material UI
What problems does this solution solve for this specific project?: 
Organizes state and manages front-end part of the project, reduces need for page reloads during navigation
Routing links
DOM Manipulation

What are the costs of using this solution? 
Search engine optimization is not up to par yet for single page applications. 
Dependencies we’ll use such as Router and Redux maintained by people that didn’t create React.

What will you be using for styling and presentation?  
styled components, Material UI
Back End
Solution: Node, Express
What problems does this solution solve for this specific project?:
JavaScript on the front and back end
Reduces server-side logic complexity -> faster development
Minimalist and un-opinionated framework
Performance and cross-platform coverage

What are the costs of using this solution?
Single-threaded framework with event-driven nature with callbacks
Database
Solution: SQLite for dev and PostgreSQL for prod, Knex
What problems does this solution solve for this specific project?:
Structured schemas to define data
Relationships between data
Spread data across tables
Able to query tables

What are the costs of using this solution?
Very difficult horizontal scaling
Limitations for lots of read and write queries per second

What models do you need to represent your data fully in the database in a manner that is logical and consistent?

Users table
Email address
Password
Username
List of allergy

Recipes table (many-to-one with users)
User id
Recipe name
Descriptions (or steps)

Recipes-Ingredients table (many-to-many)
Recipe id
Ingredient id
Ingredient amount

Ingredients Table
Name of ingredient

Pseudocode your models here:

Example

User
First Name
Last Name
Email address
Username
Street
City
State
Zip code
List of Documents

Document
Name
Date created
Date modified
Link to pdf in CMS

Deployment
Solution: Netlify and Heroku
What problems does this solution solve for this specific project?:
Free deployment for your Github repos
Continuous Deployment
Versioning and Rollbacks 
Previews for each branch and pull requests
Asset optimization 
Standard tools to build application so no lock-in to migrate to another service
Single-click SSL, easy redirection for encryption
Support for many static website generators
What are the costs and benefits of using this solution?
Deployment is not automatic (need to push to update)
Branch Merge conflicts
Charge premium for high volume applications
Code base is exposed to the world to see
Using added on domain name so less professional
Features
For each feature identified above, provide the following information.

Feature Name:
What services, APIs, or platforms will you use to implement this feature?:

What are the costs and benefits of using this solution?


Example
Feature Name:  Add Marker to Map
What services, APIs, or platforms will you use to implement this feature?:  
Google Maps API

What are the costs and benefits of using this solution?
Google Maps is faster than OpenMap and others, and it integrates with other Google services, but non-sandbox accounts are ten times as expensive as the others.  





Name: CRUD operations on Recipes
What services, APIs, or platforms will you use to implement this feature?:
nutrition data API (Edamam, Spoonacular, or Nutritionix)
List of available food 
What are the costs and benefits of using this solution?
API to get comprehensive food DB with information that we need.


Name: Allergies and Diet Tags
What services, APIs, or platforms will you use to implement this feature?:
Program it ourselves in JavaScript
What are the costs and benefits of using this solution?
Good performance and easy to maintain
Have direct influence in the big O of the searching algorithms and pick one that is custom fit for our needs, considering space and time complexity. 

Name: Search bar
What services, APIs, or platforms will you use to implement this feature?:
Recipe search API
What are the costs and benefits of using this solution?
Uses information that’s already out there
(Possibly natural language processing)

Name: Registration & Login
What services, APIs, or platforms will you use to implement this feature?:
Google authentication, Facebook
What are the costs and benefits of using this solution?
Most users have these other platforms where they’re registered.
Security.
Google will have AAALLL your information 

Name: Billing
What services, APIs, or platforms will you use to implement this feature?:
Stripe
What are the costs and benefits of using this solution?
Recognizable names so users will trust. Standardized. Security.

Part 3:  Summary
Use the information above to fill out the following table:


Front End
Back End
Database
React, Redux
Node, Express
SQLite3, PostgreSQL, Knex
List of APIs:
Edamam, Spoonacular or Nutritionix

List of Additional Services:
Styled Components, Material UI

Elevator Pitch


Don’t Eat That is an app where you can filter recipes based on allergies and dietary restrictions to find ones that suit your needs.

