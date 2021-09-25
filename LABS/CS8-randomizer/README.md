# Lambda Randomizer

Welcome from the Randomizer App Team! Please use the `Navigation Guide` below to begin exploring Randomizer's features!
 

Deployed at: https://lambda-labs-frontend.herokuapp.com/

# Navigation Guide

## Landing Page 
https://lambda-labs-frontend.herokuapp.com/

Signup and Login work as expected.
Click on `About Magic Randomizer` to learn more!

## Class List/ Add Class Page
https://lambda-labs-frontend.herokuapp.com/classes

Classes owned by users will be displayed here.  Note the `Menu` at the top left of the page which you can use to navigate to `Classes`, `Billing`, or `Settings`.

If no classes are owned, clicking on the `[+]` button link while navigate your to the `Create Class Page`.

## Create Class Page
https://lambda-labs-frontend.herokuapp.com/create

In order to create a class, you need to enter a "Class Name" and `Add` at least one student. An alert will confirm that your new class was added successfully.

To view your classes, click on the hamburger menu (top left on desktop, bottom left for tablet/mobile devices) and navigate to `Classes`. You should see a card for each class that you added.  Clicking on the cards will take you to the `Magic Randomizer Page` for that class.

## Magic Randomizer Page
https://lambda-labs-frontend.herokuapp.com/classes/:id

To navigate to the `Magic Randomizer Page`, you must have created at least one class.  To begin randomizing, simply navigate to your `Classes` via the hamburger menu (top left for desktops, bottom left for tablet/mobile devices), and select the class you wish to begin randomizing.

Upon creation of your first class, before you begin randomizing, an alert with helpful guidelines to using randomizer will appear.  Once you have more than once class, this guideline will no longer appear.

Sorry! The features below are not working yet!

  * `Edit` link to `Class Edit Page`
  * `DATE`
  * `On Deck` feature - shows next randomized student to be called on.
  * `Participation Rate Graph`

## Billing Page
https://lambda-labs-frontend.herokuapp.com/billing

## Settings Page
https://lambda-labs-frontend.herokuapp.com/setting

## Logout

Clicking the `Logout` button (top right corner on desktops) will log you out and take you back to the `Landing Page`.



# Endpoints

## POST -- `/api/register` -- POST

Registers a new user.

| Field        | Input                                                     | Required |
| ------------ | --------------------------------------------------------- | -------- |
| username     | String, 30 chars max                                      | Yes      |
| password     | String 6+ characters                                      | Yes      |
| confirm      | String matching password                                  | Yes      |


#GET -- `/api/login` -- GET

Authorization through JWT. Checks to see if user is valid or already authorized.

# POST -- `/api/login/` -- POST

| Property | Type   | Required |
| -------- | ------ | -------- |
| username | String | Yes      |
| password | String | Yes      |


