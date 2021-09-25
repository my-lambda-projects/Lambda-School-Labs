const express = require("express");
const router = express.Router();

//schema
const User = require("../../Schemas/User.js");

router.route("/:id").put((req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  console.log("UPDATE_INFO:", updateInfo);

  User.findOneAndUpdate(
    { _id: id }, // First argument is the "filter"
    { subscription: updateInfo.subscription},
    { new: true }
  )
    .then(response => {
      response.save();
      res.json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
