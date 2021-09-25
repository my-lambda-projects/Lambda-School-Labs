const express = require("express");
const zipcodes = require("zipcodes");

const Users = require("../models/users");
const Groups = require("../models/groups.js");
const GroupsAllegiances = require("../models/groups_allegiances.js");
const GroupsUsers = require("../models/groups_users");
const Invitees = require("../models/group_invitees");
const Requests = require("../models/private_group_request");

const router = express.Router();

const validation = require("../middleware/dataValidation");

const { groupSchema } = require("../schemas");

router
  .route("/")
  .get(async (req, res) => {
    const groups = await Groups.find();
    res.status(200).json({ groups });
  })
  .post(validation(groupSchema), async (req, res) => {
    const { creator_id } = req.body;
    // Check creator is a valid user in database before proceeding
    const user = await Users.find({
      id: creator_id,
    }).first();
    if (user) {
      const newGroup = await Groups.add(req.body);
      res.status(201).json({
        newGroup,
      });
    } else {
      res.status(404).json({
        message: "the creator of this group does not exist",
      });
    }
  });

// Endpoint to retrieve groups for search
router.route("/search").post(async (req, res) => {
  // Branch for location searches
  if (req.body.column === "location") {
    // Use zipcodes package to search for zip codes
    if (zipcodes.lookup(req.body.row)) {
      const zip = req.body.row;

      // Takes optional radius from request or sets default
      const rad = 10 || req.body.radius;

      // Returns an array of zipcodes within mile radius of the zip
      req.body.row = zipcodes.radius(zip, rad);

      // Gather group ids to prepare for member retrieval
      const groups = await Groups.search(req.body);
      const group_id = groups.map(group => group.id);

      // Retrieve members from groups_users table
      const members = await GroupsUsers.find({ group_id });
      const groupByFilter = groups.map(group => {
        return {
          ...group,
          members: members.filter(member => member.group_id === group.id),
        };
      });
      // Sort results by smallest to largest distance as the crow flies
      groupByFilter.sort(
        (a, b) =>
          zipcodes.distance(a.location, zip) -
          zipcodes.distance(b.location, zip)
      );

      // Return response with groups with loaded group as well as members lists
      res.status(200).json({
        groupByFilter,
        members,
      });
    } else {
      res.status(400).json({
        error: `Error during ${req.method} at ${req.originalUrl}: Please provide valid zip code`,
      });
    }
  }
  // Branch for non location searches
  else {
    const groups = await Groups.search(req.body);
    // Obtain list of group ids
    const group_id = groups.map(group => group.id);
    // Obtain members of all groups retrieved
    const members = await GroupsUsers.find({ group_id });
    // Add members listing to groups array
    const groupByFilter = groups.map(group => {
      return {
        ...group,
        members: members.filter(member => member.group_id === group.id),
      };
    });
    res.status(200).json({
      groupByFilter,
      members,
    });
  }
});

router
  .route("/:id")
  .put(validation(groupSchema), async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // Check that group creator exists
    const userExists = await Users.find({
      id: req.body.creator_id,
    }).first();
    if (!userExists) {
      return res.status(404).json({ message: "User cannot be found" });
    } else {
      //Check that group exists
      const groupExists = await Groups.find({ id }).first();
      if (!groupExists) {
        return res.status(404).json({ message: "That group does not exist." });
      } else {
        const updated = await Groups.update({ id }, changes);
        res.status(200).json({
          updated,
        });
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const deleted = await Groups.remove({ id: Number(id) });
    if (deleted) {
      res.status(200).json({
        deleted,
      });
    } else {
      res.status(404).json({ message: "That group does not exist." });
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    const group = await Groups.find({ id }).first();
    // Obtain listing of all allegiances for group
    const allegianceCall = await GroupsAllegiances.find({ group_id: id });
    // Shorten names for allegiance array
    const allegiances = allegianceCall.map(allegiance => {
      const {
        allegiance_id,
        allegiance_name,
        allegiance_image,
        sport,
      } = allegiance;
      return {
        id: allegiance_id,
        name: allegiance_name,
        image: allegiance_image,
        sport,
      };
    });

    // Obtain listing of all members for group
    const userCall = await GroupsUsers.find({ group_id: id });
    // Shorten names for members array
    const members = userCall.map(member => {
      const {
        user_id,
        username,
        first_name,
        last_name,
        email,
        user_location,
        user_image,
        user_type,
      } = member;
      return {
        id: user_id,
        name: `${first_name} ${last_name}`,
        image: user_image,
        username,
        email,
        location: user_location,
        status: user_type,
      };
    });

    const requestCall = await Requests.findByGroupId(id);

    const reqs = requestCall.map(req => {
      const { id, first_name, last_name, image, username } = req;
      return {
        id,
        first_name,
        last_name,
        image,
        username,
      };
    });

    if (group && group.id) {
      // Return group, allegiance, and member information
      res.status(200).json({
        group,
        allegiances,
        members,
        reqs,
      });
    } else {
      res.status(404).json({ message: "That group does not exist." });
    }
  });

router
  .route("/:id/invitees")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const users = await Invitees.findByGroupId(id);
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  })
  .post(async (req, res) => {
    try {
      const { username, sender_id } = req.body;
      const { id } = req.params;
      const user = await Users.find({ username }).first();

      if (user) {
        const user_id = user.id;
        const groupMember = await GroupsUsers.find({
          user_id,
          group_id: id,
        }).first();

        if (!groupMember) {
          const invitation = await Invitees.findByUserAndGroup(user_id, id);

          if (!invitation) {
            const invitedUser = await Invitees.addInvitation(
              id,
              user_id,
              sender_id
            );
            res.status(201).json(invitedUser);
          } else {
            res
              .status(400)
              .json({ message: "User already has a pending invite" });
          }
        } else {
          res.status(400).json({ message: "User is already a member" });
        }
      } else {
        res.status(400).json({ message: "Username not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  });

router.route("/:id/invitees/:userId/:senderId").delete(async (req, res) => {
  try {
    const { id, userId, senderId } = req.params;
    const deletedInvite = await Invitees.deleteInvitation(id, userId, senderId);
    res.status(200).json(deletedInvite);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

module.exports = router;
