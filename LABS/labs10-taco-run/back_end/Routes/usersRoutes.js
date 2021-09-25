const express = require("express");
const router = express.Router();
const knex = require("knex");
const db = require("../config.js");

// Fuse
const Fuse = require("fuse.js");

//Create
//create a new user
//post http://localhost:5555/users
//-------------------------------------------
router.post("", (req, res) => {
  const { name, email, user_pic } = req.body;

  if (!name || !email) {
    return res.status(500).json({ msg: "please provide full information" });
  }

  //get request to check if user exists
  db("users")
    .where({ email })
    .then(response => {
      //if users is not already here imput user to database
      if (response.length === 0) {
        db("users")
          .insert({ name, email, user_pic })
          .then(() => {
            //return res.status(201).json(user[0])
            db("users")
              .where({ name, email, user_pic })
              .then(res2 => {
                console.log(res2);
                return res.status(200).json(res2[0].id);
              });
          }); //else return users
      } else {
        return res.status(200).json(response[0].id);
      }
    });
});

//READ
//get all users
//get http://localhost:5555/users
//-------------------------------------------
router.get("", (req, res) => {
  db("users")
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

// READ
// Get users based off search term using fuse.js for fuzzy search
// get http://localhost:5555/users/search
router.get("/search/:term", (req, res) => {
  const term = req.params.term;
  var options = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "email"]
  };

  db("users")
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
//get all events for a user
//get http://localhost:5555/users/:id
//example response
// [
//     {
//         "id": 1,
//         "name": "taco tuesday run 2",
//         "email": "lanners.marshall@gmail.com",
//         "user_id": 1,
//         "event_id": 1,
//         "location": "770 mercer street seattle wa",
//         "date": "2/14/2019"
//     },
//     {
//         "id": 2,
//         "name": "wensday taco run",
//         "email": "lanners.marshall@gmail.com",
//         "user_id": 1,
//         "event_id": 2,
//         "location": "1440 4th street washington dc",
//         "date": "2/20/2019"
//     }
// ]

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .join("users_events", "users_events.user_id", "=", "users.id")
    .join("events", "events.id", "=", "users_events.event_id")
    .where("users.id", id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// READ
// Get User Info
// get http://localhost:5555/users/:id/info
router.get("/:id/info", (req, res) => {
  const { id } = req.params;
  db("users")
    .where("users.id", id)
    .then(response => {
      res.status(200).json(response[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//UPDATE
//update a user
//put http://localhost:5555/users/:id
//-------------------------------------------
router.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { hard_or_soft, heat_pref, street_gourmet } = req.body;
  console.log(req.body);
  db("users")
    .where({ id })
    .update({ hard_or_soft, heat_pref, street_gourmet })
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

//UPDATE
//update a users preimum
//put http://localhost:5555/users/:id/prem
router.put("/:id/prem", (req, res) => {
  const {id} = req.params
  const {isPremium} = req.body
  console.log({id})
  console.log({isPremium})
  db('users')
  .where({id})
  .update({isPremium})
  .then(response => {
    console.log(response)
    return res.status(200).json(response)
  })
  .catch(error => {
    console.log(error)
    return res.status(500).json(error)
  })
})


//DELETE
//delete a user
//delete http://localhost:5555/users/:id
//-------------------------------------------
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // finds and deletes user
  db("users")
    .where({ id })
    .del()
    .then(response => {
      // deletes user's relationship in users_friends table
      db("users_friends")
        .where({ user_id: id })
        .del()
        .then(() => {
          // deletes user relationship where he is a friend in users_friends table
          db("users_friends")
            .where({ friends_id: id })
            .del()
            .then(count => {
              res.status(200).json(count);
            })
            .catch(error => {
              res.status(500).json(error);
            });
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
