const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const Vehicle = require("./vehicle-model");
const generateToken = require("../auth/gen-token.js").generateToken;

//Brainstorm #1 Updating User Info using User-Model
//If this works do we need to make the route with a dynamic:id????
router.put("/onboarding/user", (req, res) => {
  let { firstName, lastName, username, age } = req.body;

  const { subject } = req.decodedToken;

  Users.updateUserFirstName(subject, firstName)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user"
      });
    });

  Users.updateUserLastName(subject, lastName)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user"
      });
    });

  Users.updateUserName(subject, username)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user"
      });
    });

  Users.updateAge(subject, age)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user"
      });
    });
});

//Brainstorm #2 Vehicle Info Using All the Vehicle Models
//Also how do we link the user id and the added vehicle??
router.post("/onboarding/vehicle", (req, res) => {
  let {
    name,
    height,
    width,
    length,
    weight,
    axel_count,
    vehicle_class,
    dual_tires,
    trailer,
    DirtRoads,
    SteepGrade,
    Potholes
  } = req.body;

  const { subject } = req.decodedToken;

  // users id lives on the subject key from the token they provide
  Vehicle.addVehicleName(subject, name)
    .then(vehicle => {
      if (vehicle) {
        res.status(200).json(vehicle);
      } else {
        res.status(404).json({ message: "The vehicle could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the vehicle"
      });
    });

  Vehicle.addVehicleHeight(subject, name)
    .then(vehicle => {
      if (vehicle) {
        res.status(200).json(vehicle);
      } else {
        res.status(404).json({ message: "The vehicle could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the vehicle"
      });
    });
});

//Brainstorm # 3 Using the info from add vehicle from vehicle router
//Also how do we link the user id and the added vehicle??
router.post("/onboarding/vehicle", (req, res) => {
  // users id lives on the subject key from the token they provide
  const { subject } = req.decodedToken;
  if (!subject) {
    res.status(400).json({
      message: "must provide a valid user id"
    });
  } else {
    Vehicle.add({ ...req.body, user_id: subject }).then(vehicle => {
      res.status(201).json(vehicle);
    });
  }
});

module.export = router;

//add a user
// router.post("/onboarding", (req, res) => {
//   let { user, vehicle } = req.body;

//   const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
//   user.password = hash;
//   //add the user
//   Users.add(user)
//     .then(user => {
//       let { status, error } = Users.login(email, password); //?????
//       if ((status = 200)) {
//         res.status(200).json({
//           message: `Welcome ${user.email}!`,
//           token,
//           user
//         });
//         //Add vehicle
//         Vehicle.add(vehicle);
//         //Add Routing Prefs
//         //TODO: Extend BE with Route Faetures API/Endpoints
//       } else if ((status = 401)) {
//         res.status(401).json({ message: "Invalid Credentials" });
//       } else if ((status = 500)) {
//         res.status(500).json(error);
//       }
//     })
//     .catch(error => {
//       //Add user failed
//       res.status(500).json(error);
//     });
// });
