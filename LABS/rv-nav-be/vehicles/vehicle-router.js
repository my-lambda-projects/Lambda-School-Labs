const router = require("express").Router();
const Vehicle = require("./vehicle-model");
const protectedRoute = require("../auth/gen-token.js").protectedRoute;

// ADD A vehicle
router.post("/", (req, res) => {
  console.log("vehicle post req.body", req.body);
  Vehicle.add(req.body)
    .then(vehicle => {
      console.log(vehicle);
      res.status(201).json(vehicle);
    })
    .catch(err => {
      console.log("Error", err);
      res.status(404).json({ err });
    });
});

// GET VEHICLE
router.get("/", (req, res) => {
  // users id lives on the subject key from the token they provide
  const { subject } = req.decodedToken;
  Vehicle.findUsersVehicles(subject)
    .then(vehicles => {
      console.log("u here bro?", vehicles);
      res.json(vehicles);
    })
    .catch(err => {
      console.log("Error", err);
      res.status(404).json({ err });
    });
});

// GET SINGLE vehicle
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // users id lives on the subject key from the token they provide
  const { subject } = req.decodedToken;
  Vehicle.findById(id)
    .then(vehicle => {
      if (subject == vehicle.user_id) {
        res.json(vehicle);
      } else {
        res.status(404).json({ message: "No vehicle by that id" });
      }
    })
    .catch(err => res.status(404).json({ message: "No vehicle by that id" }));
});

// Update vehicle
router.put("/:id", (req, res) => {
  const changedVehicle = req.body;
  const { id } = req.params;
  // users id lives on the subject key from the token they provide
  const { subject } = req.decodedToken;
  console.log("subject",subject);
  Vehicle.findById(id)
    .then(vehicle => {
      if (subject === vehicle[0].user_id) {
        Vehicle.updateVehicle(id, changedVehicle).then(count =>
          res.json(count)
        );
      } else {
        res.status(404).json({ message: "No vehicle by that id" });
      }
    })
    .catch(err => res.status(404).json({ message: "No vehicle by that id" }));
});

// Delete vehicle
router.delete("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  // users id lives on the subject key from the token they provide
  const { subject } = req.decodedToken;
  console.log("decoded token", subject);
  Vehicle.findById(Number(id))
    .then(vehicle => {
      console.log("vehicle", vehicle);
      if (Number(subject) === Number(vehicle[0].user_id)) {
        Vehicle.deleteVehicle(id).then(count => res.json(count));
      } else {
        res.status(404).json({ message: "No vehicle by that id" });
      }
    })
    .catch(err => res.status(404).json({ message: "No vehicle by that id" }));
});

module.exports = router;
