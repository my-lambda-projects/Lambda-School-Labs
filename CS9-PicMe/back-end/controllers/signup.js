const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

//Database initializers, used to make queries ^


const signup = (req, res) => {
  const {first_name, last_name, email, password} = req.body;

  const createUser = async () => {
    await User.create({ 
      first_name: first_name || "", //Added "" to check if there is a length > 1, otherwise an error stating undefined variable
      last_name: last_name || "",
      email: email || "",
      password: password || "", 
      nick_names: null,
      credits: 0,
      hashed_id: 1
    }).then(user => {
      const hashed_id = jwt.sign({ id: user.id }, secret); //Need to hash it here as before/after create hooks cause problems
      User.update({hashed_id}, {where: {email: email}}).then()
    }).catch(err => {
      console.log(err)
      res.status(400).json({Error: "Email in use"})
    })
    //Responses had to be done here, otherwise the code would send success as it's an asynchronous function
    res.status(200).json({Message: "Success"})
  }

  if (first_name && last_name && email && password) { //Makes sure no field is left blank
    createUser(); //If all fields filled, creates a user
  }
  else {
    res.status(400).json({Error: "Please make sure all fields are filled out"})
  }
}

module.exports = {
  signup
}; //Exports the signup controller to be used in routes