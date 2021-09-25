const express = require("express");
const router = express.Router();
const db = require("../config.js");

//Create
//create a new friend
//post http://localhost:5555/users_friends
//-------------------------------------------
router.post("", (req, res) => {
  const { user_id, friends_id } = req.body.data;
  db("users_friends")
    .where({ user_id, friends_id })
    .then(response => {
      if (response.length > 0) {
        return res
          .status(200)
          .json({ msg: "you are already friends with user" });
      } else {
        //first we made the person our friend

        db.insert({ user_id, friends_id })
          .into("users_friends")
          .then(() => {
            /*then we set the other person as friends with us
				table will look like

				id 1 | user_id 1 | friend_id 2
				id 2 | user_id 2 | friend_id 1
				*/

            let friend = { user_id: friends_id, friends_id: user_id };
            db.insert(friend)
              .into("users_friends")
              .then(response => {
                return res.status(201).json(response);
              });
          }) //catch for adding friendship to users
          .catch(error => {
            console.log(error);
            return res.status(500).json(error);
          });
      }
    }) //catch for looking up friendship on users
    .catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });
});

//READ
//get all friends from a user
//get http://localhost:5555/users_friends/:id
//-------------------------------------------
/*
	could be used to get all of loggin users friends by passing in users
	id to the url. Can also be used to get all the friends of another user
	by passing in thier id to the url
*/

/* example response
[
    {
        "id": 2,
        "name": "steve lanners",
        "email": "lanners.steve@gmail.com",
        "user_id": 2,
        "friends_id": 1
    },
    {
        "id": 3,
        "name": "carl lanners",
        "email": "lanners.carl@gmail.com",
        "user_id": 3,
        "friends_id": 1
    }
]
*/

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("users_friends")
    .join("users", "users.id", "=", "users_friends.friends_id")
    .where("users_friends.user_id", id)
    .then(response => {
      //console.log(response)
      return res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });
});

//DELETE
/*
	delete both you and them are remove from each others friends list
*/
//delete http://localhost:5555/users_friends/
//-------------------------------------------
router.delete("", (req, res) => {
  const { user_id, friends_id } = req.body;
  db("users_friends")
    .where({ user_id, friends_id })
    .del()
    //delete one person as a friend
    .then(() => {
      //that person deletes me as a friend
      let friend = { user_id: friends_id, friends_id: user_id };
      db("users_friends")
        .where(friend)
        .del()
        .then(response => {
          /* will delete 2 rows like this as example
				id 1 | user_id 1 | friend_id 2 <-- deleted
				id 2 | user_id 2 | friend_id 1 <-- deleted
			*/

          return res.status(200).json(response);
        }) //catch for failed delete on friend
        .catch(error => {
          console.log(error);
          return res.status(500).json(error);
        });
    }) //catch on failed delete of users friend
    .catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });
});

module.exports = router;
