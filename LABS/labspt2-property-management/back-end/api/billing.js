const express = require("express");
const router = express.Router();
const db = require("../data/helper/billing");

// Get all properties
router.get("/", (req, res) => {
  db.get()
    .then(billing => res.status(200).json(billing))
    
});

// Get a property
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(property => {
      if (property) {
        res.status(200).json(property);
      } else {
        res
          .status(404)
          .json({ error: "The specified property does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


module.exports = router;