# CS8-backwoods
This Lambda Labs Project is a location based trip planner to keep your family and friends informed of your adventures.
## Tech Stack
React, Express, Node, Postgres
## Deploy URL [Backwoods](https://www.backwoods.app/)
## To run project locally 
_______________________________

## Known issue
You must use NPM to install packages for this project. Our Heroku deploy fails if `yarn.lock` files are present in the build. With no lock file a package manager will install the newest dependencies which can cause incompatibility issues. Notably the date picker and maps packages that we are using.

1. Clone repo.
2. In `/CS8-Backwoods` type `npm i` to install back-end dependencies.
3. Make sure you have a Postgres DB running on your local machine. [Instructions here](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)
4. The `npm start` command will start back-end server [listening on port 8000](http://localhost:8000/).
5. Open a new terminal window.
6. `cd client` type `npm i` to install front-end dependencies.
7. The or `npm start` command visit site at [localhost:3000](http://localhost:3000/)


## Testing Instructions

1. Sign-up: located in the top right hand corner is a `SIGN UP/SIGN IN` button, this will pop-up a modal to the sign-up forum after entering the needed credentials to sign-up and hitting submit will make a green `user successfully created!` tab pop up at the top of the browser and should direct you to the sign-in modal.
2. Sign-in: After signing up and being redirected to sign-in your username and password should already be filled in with the correct credentials and you can hit submit to quickly sign-in. This will make a green `Logged in successful!` tab pop up at the top of the browser and redirect you to  the logged in home page where you get a  navigation bar on the side and 
a ` Add your first trip!` card with the plus Icon on the page.
3. Adding your first Trip: If you click on the plus Icon you'll be routed to the create-trip page. On this page you'll have to fill out `Name`, `Start Date`, `End Date` and the `save trip` button will no longer be grayed out and enabled! After filling out the required fields to save the trip you can click the `Add` button to the right of the map to add your first marker to the trip. Once you've clicked `Add` you can now fill out your marker name and the card will open up and show your required `ETA` for the marker. After filling out your `Marker Name` and `ETA` you can click on the map to place your marker then you're able to save the marker to the trip and the `Add` button will not be grayed out and enabled once again to add more markers, if you want to delete the marker you'll see the `Remove` button is no longer grayed out (after saving a marker) and you can delete that marker and add a new one. After completing these steps you can save your trip and you'll  be redirected back to the home page and see your trip in a card view with your`title`at the top and `start date`/`end date` located below the thumbnail.
4. Clicking to view a trip: After you've created your trip(s) you can click on the card that was created for your trip(s) and you'll be directed to the view for the trip you just clicked on you'll have your `trip Name` in the top right and your `start date`/`end date` to the right of the map once again. You'll also have `checkpoint name`(marker name) in a card that is clickable to view your `ETA` for that marker. `markers` will be placed on the map that correspond with the `checkpoint`/`marker` on the right hand side of the map (currently not implemented).
5. Archiving Trips: After clicking the `Home` breadcrumb in the top right you'll be redirected to see your saved trip(s) again and you can `Archive` a trip by clicking the `Archive` button. This will take the trip out of your main trip(s) view and place it in the `Archived` section of your navigation on the left. Once clicking the `Archived` you'll be able to see your `Archived` trips (working on getting this view to see the archived trips).
6. Changing Password: when clicking on the `Account` tab in the navigation you'll be redirected to a card where you can change your password. After entering your existing `email`, `Old Password`, and your desired `New Password` you'll have a green tab that pops up at the top of the browser saying `Changed Password Successfully!` and  you can not log out and log back in with the new password.
7. Payment: when clicking on the `Billing` tab in the navigation where you'll  be redirected to a card where you can enter your provided credentials for a subscribtion to the app. After entering valid credentials and clicking `Buy Now` below the form your screen will change to a `Purchase Complete` method.

##### Notes
* If go to `/(email for user created)` while not logged in you or a guest will be able to view the trips this user created that are not archived. Also, the navigation menu will not let you access `Archived`, `Billing`, and `Account` tabs.


### Back-end Dependencies:
_____________________________
* [express](https://expressjs.com/)
* [body-parser](https://github.com/expressjs/body-parser)
* [cors](https://github.com/expressjs/cors#readme)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
* [pg](https://github.com/brianc/node-postgres)
* [pg-hstore](https://github.com/scarney81/pg-hstore)
* [sequelize](http://docs.sequelizejs.com/)
* [chai](http://www.chaijs.com/)
* [chai-http](https://github.com/chaijs/chai-http)
* [mocha](https://mochajs.org/)
* [nodemon](https://nodemon.io/)
### Front-end Dependencies:
* [sinon](http://sinonjs.org/)
* [sinon-chai](https://github.com/domenic/sinon-chai)
* [Material-UI](https://material-ui.com/)
* [axios](https://github.com/axios/axios)
* [google-maps-react](https://github.com/fullstackreact/google-maps-react)
* [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
* [react-stripe-elements](https://github.com/stripe/react-stripe-elements)
* [react-material-ui-form-validator](https://github.com/NewOldMax/react-material-ui-form-validator#readme)


### API
____________
#### Sign up a new user
* POST route `/signup` 
##### Example json object of required data
```
{
	"firstName": "Test",
	"lastName": "Test",
	"email": "test@test.com",
	"password": "test"   
}
```
_______
#### Sign in as existing user
* POST route `/login`
##### Example json object of required data
```
{
	"email": "test@test.com",
	"password":"test"
}
```
(This route will return a JWT token that you will need to create trips)
_______
#### Checking if user has trips
* GET route `/:user`
##### Example route (no data required other then user email in route)
`/test@test.com`
_________
#### Create Trip with existing user
* POST route `/createTrips`
##### Example json object of required data
```
{
	"tripName": "test",
	"startDate": "10-23-18",
	"endDate": "11-24-18",
	"email": "new@test.com"
}
```
(Under headers/Authorization you will need to pass back the JWT token from the `/login` route)
_______
#### Change password
* PUT route `/trips/settings`
#### Example json object of required data
```
{
	"email": "test@test.com",
	"oldPassword": "test"
	"password": "newTest"
}
```
(Requires auth JWT token from login to work)
_______
#### Create Marker
* POST route `/createMarker`
#### Example json object of required data
```
{
	"markersArr": [
		{
			"tripId":"3ce4b524-3f55-45f0-ada1-203da7c557e4",
			"markerName":"test1",
			"eta":"test1",
			"long":"test1",
			"lat":"test1"
		},
		{
			"tripId":"3ce4b524-3f55-45f0-ada1-203da7c557e4",
			"markerName":"test2",
			"eta":"test2",
			"long":"test2",
			"lat":"test2"
		},
		{
			"tripId":"3ce4b524-3f55-45f0-ada1-203da7c557e4",
			"markerName":"test3",
			"eta":"test3",
			"long":"test3",
			"lat":"test3"
		},
			{
			"tripId":"3ce4b524-3f55-45f0-ada1-203da7c557e4",
			"markerName":"test4",
			"eta":"test4",
			"long":"test4",
			"lat":"test4"
		}
	]
}
```
(requires the id from the trip you created and inserted here as tripID and requires auth JWT token from login to work)
_______
#### Get Markers
* GET `/getMarkers/:tripId`
(need to pass in your id from the trip you created that is connected to the markers)
_______
#### Archive Trip
* PUT `/:user/archiveTrip`
#### Example json object of required data
```
{
	"id": "60efdf74-64a9-4268-bae6-4999e4a8cde0",
	"Archived":"true"
}
```
(pass in the id from the trip you want archived)
_______
#### Get Archived Trips
* GET `/:user/getArchivedTrips`
(need to pass in Auth token from login)
_______


<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />All images are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.