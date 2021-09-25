const express = require("express");
const router = express.Router();
const db = require("../data/helper/landlords");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  db.get()
    .then(landlord => res.status(200).json(landlord))
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

router.post("/", (req, res, next) => {
  const landlord = req.body;
  db.create(landlord)
    .then(ids => {
      db.findByUserId(ids[0])
        .then(newUser => {
          res.status(201).json({ newUser: newUser.id });
        })
        .catch(err => {
          res.status(500).json({ error: `${err}` });
        });
    })
    .catch(err => {
      next("h500", err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

router.post("/", (req, res, next) => {
  const landlord = req.body;
  db.create(landlord)
    .then(ids => {
      db.getById(ids[0])
        .then(newUser => {
          res.status(201).json({ newUser: newUser.id });
        })
        .catch(err => {
          res.status(500).json({ error: `${err}` });
        });
    })
    .catch(err => {
      next("h500", err);
    });
});

router.put("/:id", (req, res, next) => {
  db.getById(req.body.id || req.params.id).then(user => {
    const id = user.id;

    //this code runs IF they type in the old password
    if (req.body.oldPW) {
      //this authenticates the old password
      if (bcrypt.compareSync(req.body.oldPW, user.password)) {
        // hashes the new password
        hash = bcrypt.hashSync(req.body.newPW1);

        // new object to update old
        const edit = {
          email: req.body.email,
          phone: req.body.phone,
          textSubscribe: req.body.textSubscribe,
          emailSubscribe: req.body.emailSubscribe,
          password: hash
        };

        // calls database function to update user
        db.editById(id, edit)
          .then(updated => {
            if (updated) {
              res.status(200).json({
                message: "User updated"
              });
            } else {
              res.status(404).json({ error: "That user seems to be missing!" });
            }
          })
          .catch(err => {
            next("h500", err);
          });
      } else {
        // if the type in old password incorrect
        res.status(401).json({ error: "Your old password is incorrect" });
      }
    } else {
      // if they update information but don't try to change password
      const edit = {
        displayName: req.body.displayName,
        email: req.body.email,
        phone: req.body.phone,
        textSubscribe: req.body.textSubscribe,
        emailSubscribe: req.body.emailSubscribe,
        residence_id: req.body.residence_id
      };
      db.editUser(id, edit)
        .then(updated => {
          if (updated) {
            res.status(200).json({
              message: "User updated"
            });
          } else {
            res.status(404).json({ error: "That user seems to be missing!" });
          }
        })
        .catch(err => {
          next("h500", err);
        });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.deleteUser(id)
    .then(user => {
      if (user) {
        res.status(202).json({ message: "User deleted" });
      } else {
        res.status(404).json({ error: "That user seems to be missing!" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

module.exports = router;
