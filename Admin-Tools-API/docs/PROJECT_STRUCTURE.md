## Summary:
This branch has been restructured to make use of Expressjs' modular capabilities. Using Express' [Router](https://expressjs.com/en/guide/routing.html#express-router) class, the project is divided in separate 'apps' inside the 'api' directory corresponding to their specific model and its logic.

All of the Settings for the project lives in the 'config' folder and separated in their own files:

### /config
1. **config.js**: exports an object with two nested objects depending on the environment. Please keep identical keys in both objects, just replace value with corresponding variable.
    1. TODO: Add 'staging' object.
2. **express.js**: exports a function with the settings/middleware for the express server. This function expects two params, the express server, and the config object. If we need to add any additional middleware to the server, this is where we will do it in the future.
3. **mongoose.js**: exports a function that takes one parameter, the config object. It uses the mongoose package and the config object to connect to a mongodb instance.
4. **routes.js**:  exports a function that takes the express server and uses the [route](https://expressjs.com/en/guide/routing.html#app-route) method to redirect requests to the API to its corresponding App in our **API**...

### /api
Each subfolder in this folder is like its own App. References to a specific folder is responded to with either the index.js file, or a specific file in that folder. The index.js file creates an express.Router instance where we can interact with and add middleware to an app. 

Each subfolder also has a app.controller.js file named according to that folder's purpose. Each controller file exports a function that returns an object of functions. Make sure endpoints in the index.js file have a corresponding function in this object. Or else we will encounter an error.

Finally, and probably most importantly, each subfolder also has an app.model.js file. This is the mongoose model for the specific app/subfolder you're in. This is the model that the functions in the controller file will be acting on... (Creating, Reading, Updating, Deleting)

*utils* and *home* subfolders may or may not need a model.

==============================================================================================


This structure allows the app to scale and grow easily now that all logic is modular for the most part.

TODO: A lot of things....