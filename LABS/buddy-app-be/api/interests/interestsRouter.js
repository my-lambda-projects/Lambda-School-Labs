const express = require("express");
const router = express.Router();

const Interests = require("./interests.js");
const {
  validateInterest,
  validateUserInterest
} = require("./interestsMiddleware");

// get a list of all interests available (controlled by seed data)
router.get("/", (req, res) => {
  Interests.getInterests()
    .then(interests => {
      res.status(200).json(interests);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// get a specific interest by id
router.get("/:interestid", validateInterest, (req, res) => {
  const id = req.params.interestid;

  Interests.getInterestById(id)
    .then(interest => {
      res.status(200).json(interest);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// user interests

// get the interests associated with a specific userid
router.get("/user/:userid", (req, res) => {
  const userId = req.params.userid;

  Interests.getUserInterests(userId)
    .then(userInterests => {
      res.status(200).json(userInterests);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// add a user & their interest to the user_interests table
router.post("/user", validateInterest, (req, res) => {
  const userInterest = req.body;

  Interests.addUserInterest(userInterest)
    .then(newInterest => {
      res.status(201).json(newInterest);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// remove an interest from being associated with a particular user
router.delete("/user/:userid/:interestid", validateUserInterest, (req, res) => {
  const userId = req.params.userid;
  const interestId = req.params.interestid;

  Interests.deleteUserInterest(userId, interestId)
    .then(deleted => {
      res.status(200).json({
        message: `Successfully removed interest #${interestId} from user #${userId}`
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
