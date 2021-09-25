const express = require("express");

//schema
const Class = require("../../Schemas/Class.js");

const router = express.Router();

router
  .route("/:id")
  .put((req, res) => {
    console.log("REQ", req.body);
    const { id } = req.params;
    const updateInfo = req.body;
    if (req.body) {
      if (req.body.users) {
        Class.findByIdAndUpdate(
          id,
          {
            $push: { users: updateInfo.users }
          },
          { new: true }
        )
          .then(response => {
            res.json(response);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else if (req.body.students) {
        Class.findByIdAndUpdate(
          id,
          {
            $push: { students: updateInfo.students }
          },
          { new: true }
        )
          .then(response => {
            res.json(response);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        return "Error: Cannot process request because no user ID or class ID were provided!";
      }
    } else {
      return "Error: req.body is empty!";
    }
  });

module.exports = router;
