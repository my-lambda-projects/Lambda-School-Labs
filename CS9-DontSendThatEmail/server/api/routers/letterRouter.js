const router = require("express").Router();
const User = require("../models/user");
const { login, authenticate, localStrategy } = require("../controllers/login");
const { protected, jwtStrategy } = require("../jwt/jwt");
const passport = require("passport");
const Letter = require("../models/letter");

// Passing protected middleware to check if user is logged in
router.get("/", protected, (req, res) => {
  // grabs an id from the request issues by JWT
  const userid = req.user._id;
  User.findById(userid)
    .select("-password -subscription")
    .populate("letters")
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id", protected, (req, res) => {
  const id = req.params.id;
  Letter.findById(id)
    .populate("user_id")
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", protected, (req, res) => {
  const { name, content, destination } = req.body;
  // find the current logged in user
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        res.status(404).json("user not found!");
      } else {
        const newLetter = new Letter({
          name,
          destination,
          user_id: req.user._id
        });
        newLetter.versions.push({ content });
        newLetter
          .save()
          .then(saved => {
            // define new letter, push content to its versions array and save.  
            // Call custom addLetter method (found in user model) on the logged in user.
            // method pushes saved letter's id to users letters array as ref points, then save the user
            user.addLetter(saved._id);
            user.save();
            res.status(201).json(saved);
          })
          .catch(error => {
            res.status(500).json(error.message);
          });
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.post("/updateLetter/:id", protected, (req, res) => {
  const id = req.params.id;
  const { content } = req.body;

  // Insert possible check if `content` was provided here
  Letter.findById(id).then(letter => {
    letter.versions.push({ content });
    letter
      .save()
      .then(updatedLetter => {
        res.status(200).json(updatedLetter);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });
});

router.delete("/:id", protected, (req, res) => {
  const id = req.params.id;
  Letter.findByIdAndRemove(id)
    .then(response => {
      if (response) {
        res
          .status(200)
          .json({ message: `Successfully deleted the letter with id: ${id}` });
      } else {
        res.status(404).json({
          message: "The letter with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The letter information could not be retrieved." });
    });
});

module.exports = router;
