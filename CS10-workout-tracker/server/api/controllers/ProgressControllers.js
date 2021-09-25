const User = require("../models/User");
const Progress = require("../models/Progress");

const addProgress = (req, res) => {
  const userId = req.userId;
  const { weight, hips, waist, r_arm, l_arm, r_leg, l_leg } = req.body;

  const newProgressParameters = {
    weight,
    hips,
    waist,
    r_arm,
    l_arm,
    r_leg,
    l_leg,
    user: userId
  };
  const newProgress = new Progress(newProgressParameters);

  newProgress.save((err, createdProgress) => {
    if (err) {
      res.status(500);
      return res.json({ err });
    }
    User.findByIdAndUpdate(userId, { $push: { progress: createdProgress._id } })
      .then(updatedUser => {
        res.status(200);
        res.json({
          msg: "Successfully created a Progress document.",
          progress: createdProgress,
          user: updatedUser
        });
      })
      .catch(err => {
        res.status(500);
        res.json({ err });
      });
  });
};

const fetchProgress = (req, res) => {
  const userId = req.userId;

  User.findById(userId)
    .populate("progress")
    .then(foundUser => {
      res.json(foundUser);
    })
    .catch(err => {
      res.status(500);
      res.json({ err });
    });
};

const deleteProgress = (req, res) => {
  const { id } = req.params;
  Progress.findById({ _id: id }, function(err, found) {
    if (err) {
      res.status(500);
    }
    found.remove(function(err) {
      if (err) res.status(500);
      res.json({ err });

      let user_id = found.user;
      User.findByIdAndUpdate(user_id, { $pull: { progress: id } }, function(
        err
      ) {
        if (err) console.log(err);
      });
    });
  });
};

const updateProgress = (req, res) => {
  const { id } = req.params;
  const updatedProgressObj = req.body;
  Progress.findByIdAndUpdate(
    { _id: id },
    { $set: updatedProgressObj, $setOnInsert: { date: Date.now() } },
    { new: true }
  )
    .then(progress => {
      res.json(progress);
    })
    .catch(err => {
      res.status(500);
      res.json({ err });
    });
};

module.exports = {
  addProgress,
  fetchProgress,
  deleteProgress,
  updateProgress
};
