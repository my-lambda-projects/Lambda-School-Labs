const express = require("express");

const UsersAllegiances = require("../models/users_allegiances");
const Allegiances = require("../models/allegiances");
const Users = require("../models/users");

const router = express.Router();

const validation = require("../middleware/dataValidation");
const { userAllegianceSchema } = require("../schemas");

router
  .route("/")
  .get(async (req, res) => {
    // check if there are filters present on request body, if so pass filter to find function
    if (Object.keys(req.body).length > 0) {
      const userAllegiance = await UsersAllegiances.find(req.body);
      res.status(200).json({
        userAllegiance
      });
      // if there are no filters being passed on request body, send entire listing of associations
    } else {
      const userAllegiance = await UsersAllegiances.find();
      res.status(200).json({
        userAllegiance
      });
    }
  })
  .post(validation(userAllegianceSchema), async (req, res) => {
    const { allegiance_id, user_id } = req.body;
    // Check if allegiance exists
    const allegiance = await Allegiances.find({
      id: allegiance_id
    }).first();
    // Check if user exists
    const user = await Users.find({
      id: user_id
    }).first();
    if (allegiance && user) {
      // If both user and allegiance exists, create new association
      const newUserAllegiances = await UsersAllegiances.add(req.body);
      res.status(201).json({
        newUserAllegiances
      });
    } else {
      res.status(404).json({
        message:
          "User id provided or Allegiance id provided does not exist, please double check inputs"
      });
    }
  })
  // Delete by user and allegiance IDs
  .delete(validation(userAllegianceSchema), async (req, res) => {
    const { user_id, allegiance_id } = req.body;
    const deleted = await UsersAllegiances.remove({ user_id, allegiance_id });
    if (deleted) {
      res
        .status(200)
        .json({ message: "The user to allegiance pairing has been deleted." });
    } else {
      res
        .status(404)
        .json({ message: "That user to allegiance pairing does not exist." });
    }
  });

router
  .route("/:id")
  .delete(async (req, res) => {
    const { id } = req.params;
    const deleted = await UsersAllegiances.remove({ id });
    if (deleted) {
      res
        .status(200)
        .json({ message: "The user to allegiance pairing has been deleted." });
    } else {
      res
        .status(404)
        .json({ message: "That user to allegiance pairing does not exist." });
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    // Check if user to allegiance pairing exists
    const userAllegiances = await UsersAllegiances.find({
      "u_a.id": id
    }).first();
    if (userAllegiances) {
      res.status(200).json({ userAllegiances });
    } else {
      res
        .status(404)
        .json({ message: "That user to allegiance pairing does not exist." });
    }
  });

// endpoint to retrieve allegiance relationship for logged in user
router.route("/search").post(async (req, res) => {
  // check for user_id and allegiance_id in request body
  const { user_id, allegiance_id } = req.body;
  // if both user_id and allegiance_id are defined in body move along this branch
  if (user_id !== undefined && allegiance_id !== undefined) {
    // find if relation between user and allegiance entered exists, if so return find function from groups_users model
    const relationExists = await UsersAllegiances.find(req.body).first();
    if (relationExists) {
      res.status(200).json({
        relationExists
      });
      // if relation does not already exist, check for user and allegiance existence
    } else {
      const user = await Users.find({
        id: user_id
      }).first();
      const allegiance = await Allegiances.find({
        id: allegiance_id
      }).first();
      // if user and allegiance exists, send allegiance information
      if (user && allegiance) {
        res.status(200).json({
          allegiance
        });
      } else {
        res.status(404).json({
          message:
            "User id provided or Allegiance id provided does not exist, please double check inputs"
        });
      }
    }
    // if either user_id and allegiance_id are undefined return 400 message
  } else {
    res
      .status(400)
      .json({ message: "User_id and allegiance_id must be provided." });
  }
});

// endpoint to retrieve all allegiances for a user
router.route("/search/:user_id").get(async (req, res) => {
  // obtain user_id from params
  const { user_id } = req.params;
  // find if user has any allegiances
  const allegiances = await UsersAllegiances.find({ user_id });
  if (allegiances.length > 0) {
    // if allegiances array is not empty, then send allegiances as a response
    res.status(200).json({
      allegiances
    });
  } else {
    res.status(404).json({
      message: "User id provided does not exist or has no allegiances"
    });
  }
});

module.exports = router;
