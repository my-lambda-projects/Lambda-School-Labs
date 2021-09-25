const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const generateToken = require("../auth/gen-token.js").generateToken;

//add a user
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.email}!`,
          token,
          user
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Users.findBy({ email })
//   .first()
//   .then(user => {
//     if (user && bcrypt.compareSync(password, user.password)) {
//       const token = generateToken(user);

//       res.status(200).json({
//         message: `Welcome ${user.email}!`,
//         token,
//         user
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid Credentials' });
//     }
//   })
//   .catch(error => {
//     res.status(500).json(error);
//   });
//});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Users.removeUser(id);

    if (deleted) {
      res.json({ removed: id });
    } else {
      res.status(404).json({ message: "Could not find user with given id" });
    }
  } catch (err) {
    res.status.json({ message: "Failed to delete user" });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: err }));
});
router.put("/user/:id", (req, res) => {
  const id = req.params.id;

  const body = req.body;

  Users.update(id, body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        console.log("user", user);
        res.status(404).json({ message: "The user could not be foundsssss" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user"
      });
    });
});

module.exports = router;

//login a user
// router.post('/login', (req, res) => {
//   let { email, password } = req.body;
//   let {status, error} = Users.login(email, password)
//   if (status = 200) {
//     res.status(200).json({
//       message: `Welcome ${user.email}!`,
//       token,
//       user
//     });
//     //Add vehicle
//     Vehicle.add(vehicle)
//     //Add Routing Prefs
//     //TODO: Extend BE with Route Faetures API/Endpoints
//   } else if (status = 401) {
//     res.status(401).json({ message: 'Invalid Credentials' });
//   } else if (status = 500) {
//     // res.status(500).json(error);
//     console.error()
//   }
