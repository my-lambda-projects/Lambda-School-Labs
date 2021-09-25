## Recipes API

https://donteatthat.herokuapp.com

## GET https://donteatthat.herokuapp.com/api/recipes/all

Returns an array of all the recipes of all users.

## GET https://donteatthat.herokuapp.com/api/recipes/:userid

Returns an array of all the recipes of a single user.

## GET https://donteatthat.herokuapp.com/api/recipes/one/:id

Returns a json of a recipe and it's details and ingredients.

## POST https://donteatthat.herokuapp.com/api/recipes/create

Returns an id of the recipe created. Needs a recipe name, description, userid, and an ingredient array with each ingredient having a name, quanitity and unit as follows:

```js
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"userid": 2,
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

## EDIT https://donteatthat.herokuapp.com/api/recipes/edit/:id

Returns the edited object like the one above. Needs a recipe name, description, userid, and an ingredient array with each ingredient having a name, quanitity and unit as follows:

```js
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"userid": 2,
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

## DELETE https://donteatthat.herokuapp.com/api/recipes/delete/:id

Returns a count of the number of recipes deleted. Needs the recipe id in query to work.

Test Account
There is an account that bypass Firebase and let you access the site.
This is in case Firebase doesn't work in important moment (ie. demo)
The account email is "test@test.com" and password is "1234"
App will let this account access the site without going through Firebase OAuth.
