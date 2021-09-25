const express = require("express");

const GroupsAllegiances = require("../models/groups_allegiances");
const Allegiances = require("../models/allegiances");
const Groups = require("../models/groups");

const router = express.Router();

const validation = require("../middleware/dataValidation");
const { groupAllegianceSchema } = require("../schemas");

router
  .route("/")
  .get(async (req, res) => {
    // check if there are filters present on request body, if so pass filter to find function
    if (Object.keys(req.body).length > 0) {
      const groupAllegiance = await GroupsAllegiances.find(req.body);
      res.status(200).json({
        groupAllegiance
      });
      // if there are no filters being passed on request body, send entire listing of associations
    } else {
      const groupAllegiance = await GroupsAllegiances.find();
      res.status(200).json({
        groupAllegiance
      });
    }
  })
  .post(validation(groupAllegianceSchema), async (req, res) => {
    const { allegiance_id, group_id } = req.body;
    // Check if allegiance exists
    const allegiance = await Allegiances.find({
      id: allegiance_id
    }).first();
    // Check if group exists
    const group = await Groups.find({
      id: group_id
    }).first();
    if (allegiance && group) {
      // if both allegiance and group exists, create relationship between the two
      const newGroupAllegiances = await GroupsAllegiances.add(req.body);
      res.status(201).json({
        newGroupAllegiances
      });
    } else {
      res.status(404).json({
        message:
          "Group id provided or Allegiance id provided does not exist, please double check inputs"
      });
    }
  })
  // Delete by group and allegiance IDs
  .delete(validation(groupAllegianceSchema), async (req, res) => {
    const { group_id, allegiance_id } = req.body;
    const deleted = await GroupsAllegiances.remove({ group_id, allegiance_id });
    if (deleted) {
      res
        .status(200)
        .json({ message: "The group to allegiance pairing has been deleted." });
    } else {
      res
        .status(404)
        .json({ message: "That group to allegiance pairing does not exist." });
    }
  });

router
  .route("/:id")
  .delete(async (req, res) => {
    const { id } = req.params;
    const deleted = await GroupsAllegiances.remove({ id });
    if (deleted) {
      res
        .status(200)
        .json({ message: "The group to allegiance pairing has been deleted." });
    } else {
      res
        .status(404)
        .json({ message: "That group to allegiance pairing does not exist." });
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    // Check if group to allegiance pairing exists
    const groupAllegiances = await GroupsAllegiances.find({
      "g_a.id": id
    }).first();
    if (groupAllegiances) {
      res.status(200).json({ groupAllegiances });
    } else {
      res
        .status(404)
        .json({ message: "That group to allegiance pairing does not exist." });
    }
  });

module.exports = router;
