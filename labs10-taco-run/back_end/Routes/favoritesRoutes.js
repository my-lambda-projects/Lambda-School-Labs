const express = require("express");
const router = express.Router();
const db = require("../config.js");

// Fuse
const Fuse = require("fuse.js");

//Create
//create a new favorite
//post http://localhost:5555/favorites
//-------------------------------------------
router.post("", (req, res) => {
  const { name, location, user_id } = req.body;
  //check to see if it already is a favorite
  db("favorites")
    .where({ name, location, user_id })
    .then(response => {
      //if already a favorite don't post to table
      if (response.length > 0) {
        return res
          .status(200)
          .json({ msg: "you already have place listed as favorite" });
      } else {
        //not yet a favorite then post to table
        db.insert({ name, location, user_id })
          .into("favorites")
          .then(response => {
            return res.status(201).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });
});

// READ
// Get favorites based off search term using fuse.js for fuzzy search
// get http://localhost:5555/events/search/:term
router.get("/search/:term", (req, res) => {
  const term = req.params.term;
  console.log(term);
  var options = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "location"]
  };

  db("favorites")
    .then(response => {
      var fuse = new Fuse(response, options);
      var result = fuse.search(term);
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//READ
//get all favorites from a user
//get http://localhost:5555/favorites/:id --> note this id will be the user's id ( gives you all the favorites )
//-------------------------------------------
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .join("favorites", "favorites.user_id", "=", "users.id")
    .where("users.id", id)
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });
});

//DELETE
//delete a forvorite from a user
//delete http://localhost:5555/favorites/:id --> currently this deletes the event based on the PK of the favorites table
/*
  - Delete from `favorites` where user_id = user_id
  - Then delete `favorites` where id = id
*/
//-------------------------------------------
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("favorites")
    .where({ id }) 
    .del()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json(response);
    });
});

module.exports = router;
