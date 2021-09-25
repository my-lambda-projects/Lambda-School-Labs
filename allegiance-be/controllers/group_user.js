const express = require("express");

const GroupsUsers = require("../models/groups_users");
const Users = require("../models/users");
const Groups = require("../models/groups");

const router = express.Router();

const validation = require("../middleware/dataValidation");
const { groupUserSchema } = require("../schemas");

router
  .route("/")
  .get(async (req, res) => {
    // check if there are filters present on request body, if so pass filter to find function
    if (Object.keys(req.body).length > 0) {
      const groupUsers = await GroupsUsers.find(req.body);
      res.status(200).json({
        groupUsers,
      });
      // if there are no filters being passed on request body, send entire listing of associations
    } else {
      const groupUsers = await GroupsUsers.find();
      res.status(200).json({
        groupUsers,
      });
    }
  })
  .post(validation(groupUserSchema), async (req, res) => {
    const { user_id, group_id } = req.body;
    // Check if user exists
    const user = await Users.find({
      id: user_id,
    }).first();
    // Check if group exists
    const group = await Groups.find({
      id: group_id,
    }).first();
    if (user && group) {
      // if both allegiance and group exists, create relationship between the two
      const newGroupUsers = await GroupsUsers.add(req.body);
      res.status(201).json({
        newGroupUsers,
      });
    } else {
      res.status(404).json({
        message:
          "User id provided or Group id provided does not exist, please double check inputs",
      });
    }
  })
  // Delete by user and group IDs
  .delete(async (req, res) => {
    const { group_id, user_id } = req.query;
    const deleted = await GroupsUsers.remove({ user_id, group_id });
    if (deleted) {
      res
        .status(200)
        .json({ message: "The user to group pairing has been deleted." });
    } else {
      res
        .status(404)
        .json({ message: "That user to group pairing does not exist." });
    }
  });

// endpoint to retrieve group relationship for logged in user
router.route("/search").post(async (req, res) => {
  // check for user_id and group_id in request body
  const { user_id, group_id } = req.body;
  // if both user_id and group_id are defined in body move along this branch
  if (user_id && group_id) {
    // find if relation between user and group entered exists, if so return find function from groups_users model
    const relationExists = await GroupsUsers.find(req.body);
    if (relationExists.length !== 0) {
      res.status(200).json({
        relationExists,
      });
      // if relation does not already exist, check for user and group existence
    } else {
      const user = await Users.find({
        id: user_id,
      }).first();
      const group = await Groups.find({
        id: group_id,
      }).first();
      // if user and group exists, send group information
      if (user && group) {
        res.status(200).json({
          group,
        });
      } else {
        res.status(404).json({
          message:
            "User id provided or Group id provided does not exist, please double check inputs",
        });
      }
    }
    // if either user_id and group_id are undefined return 400 message
  } else {
    res.status(400).json({ message: "User_id and group_id must be provided." });
  }
});

// endpoint to retrieve all groups for a user
router.route("/search/:user_id").get(async (req, res) => {
  // obtain user_id from params
  const { user_id } = req.params;
  // find if user has any groups
  const groups = await GroupsUsers.find({ user_id });
  if (groups.length > 0) {
    // if groups array is not empty, then send groups as a response
    res.status(200).json({
      groups,
    });
  } else {
    res.status(404).json({
      message: "User id provided does not exist or has no groups",
    });
  }
});

router
  .route("/:id")
  .put(validation(groupUserSchema), async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // Check if a relation between the group and user provided in the body exists
    const relationExists = await GroupsUsers.find({ "g_u.id": id }).first();
    if (!relationExists) {
      res
        .status(404)
        .json({ message: "That user to group pairing does not exist." });
    } else {
      const updated = await GroupsUsers.update({ id }, changes);
      res.status(200).json({ updated });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const deleted = await GroupsUsers.remove({ id });
    if (deleted) {
      res
        .status(200)
        .json({ message: "The user to group pairing has been deleted." });
    } else {
      res
        .status(404)
        .json({ message: "That user to group pairing does not exist." });
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    const groupUsers = await GroupsUsers.find({ "g_u.id": id }).first();
    if (groupUsers && groupUsers.id) {
      res.status(200).json({ groupUsers });
    } else {
      res
        .status(404)
        .json({ message: "That user to group pairing does not exist." });
    }
  });

module.exports = router;
