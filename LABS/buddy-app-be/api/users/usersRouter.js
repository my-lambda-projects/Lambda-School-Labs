const express = require("express");
const router = express.Router();
const Users = require("./users");

const { validateUser, validateUpdatedUser } = require("./usersMiddleware");

router.get("/", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", validateUser, (req, res) => {
  const id = req.params.id;
  Users.getUserById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", validateUser, (req, res) => {
  const id = req.params.id;
  Users.deleteUser(id)
    .then(deletedUser => {
      res.status(200).json({ message: "Successfully deleted user" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", validateUser, validateUpdatedUser, (req, res) => {
  const user = req.body;
  const id = req.params.id;
  Users.updateUser(id, user)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
