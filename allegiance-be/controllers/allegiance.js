const express = require("express");

const Allegiances = require("../models/allegiances");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const allegiances = await Allegiances.find();
    res.status(200).json({ allegiances });
  })
  .post(async (req, res) => {
    const newAllegiance = await Allegiances.add(req.body);
    res.status(201).json({ newAllegiance });
  });

router
  .route("/:id")
  .put(async (req, res) => {
    const { id } = req.params;
    const allegianceExists = await Allegiances.find({ id }).first();
    if (!allegianceExists) {
      res.status(404).json({ message: "That resource does not exist." });
    } else {
      const updated = await Allegiances.update({ id }, req.body);
      res.status(200).json({ updated });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    const deleted = await Allegiances.remove({ id });
    deleted
      ? res.status(200).json({ deleted })
      : res.status(404).json({ message: "That resource does not exist." });
  })
  .get(async (req, res) => {
    const { id } = req.params;
    const allegiance = await Allegiances.find({ id }).first();
    allegiance
      ? res.status(200).json({ allegiance })
      : res.status(404).json({ message: "That resource does not exist." });
  });

module.exports = router;
