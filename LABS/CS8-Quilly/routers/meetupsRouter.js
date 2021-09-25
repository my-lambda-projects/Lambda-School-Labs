const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const Meetup = require("../models/meetupModel");

// end points for 'user/meetups'
// should return all meetups for logged in user
router.get("/", (req, res) => {
  const userId = req.session.userId; // the user id of the logged in user
  User.findById(userId)
    .populate({ path: "meetups" })
    .then(user => {
      res.status(200).send(user.meetups);
    })
    .catch(error => {
      res.status(500).json({ error: "Request could not be fulfilled" });
    });
});

router.get("/refs", (req, res) => {
  const userId = req.session.userId; // the user id of the logged in user
  User.findById(userId)
    .then(user => {
      res.status(200).send(user.meetups);
    })
    .catch(error => {
      res.status(500).json({ error: "Request could not be fulfilled" });
    });
});

// end point for retrieving a single meetup by id
router.get("/:meetupId", (req, res) => {
  const { meetupId } = req.params;
  Meetup.findById(meetupId)
    .then(meetup => {
      res.status(200).json(meetup);
    })
    .catch(error => {
      res.status(500).json({ error: "Request could not be fulfilled" });
    });
});

// end point to add a meetup to a user
router.post("/add", (req, res) => {
  const userId = req.session.userId;
  const newMeetup = new Meetup(req.body);

    if (!req.body.date || !req.body.activity) {
        res.status(422).json({ error: 'date and activity are required' });
        return;
    }
    newMeetup
    .save(function(error){
        if (error)
            res.status(500).json({error: 'Meetup creation failed'});
        else {
            User
            .findById(userId)
            .then(user => {
                user.meetups.push(newMeetup);
                user
                .save()
                .then(savedUser => {
                    res.status(201).json({ message: 'Meetup successfully created' });
                })
                .catch(error => {
                    res.status(500).json({error: 'Failed to save the document.'});
                });
            })
            .catch(error => {
                res.status(500).json({error: 'Meetup creation failed'});
            });
        }
    });

});

// end point to delete a meetup
router.delete("/delete/:meetupId", (req, res) => {
  const { meetupId } = req.params;

  // delete the actual meetup
  Meetup.findByIdAndDelete(meetupId)
    .then(deletedMeetup => {
      User.findOneAndUpdate(
        { _id: req.session.userId },
        { $pull: { meetups: meetupId } }
      )
        .then(response => {
          res.status(200).json({ message: "Meetup Successfully deleted" });
        })
        .catch(error => {
          res.status(500).json({ error: "Ref not deleted" });
        });
    })
    .catch(error => {
      res.status(500).json({ error: "Delete failed" });
    });
});

// this end point modifies a single meetup
router.put("/update/:meetupId", (req, res) => {
  const { meetupId } = req.params;
  Meetup.findByIdAndUpdate(meetupId, { ...req.body })
    .then(response => {
      res
        .status(200)
        .json({ message: "Meetup information sucessfully updated" });
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to update" });
    });
});

module.exports = router;
