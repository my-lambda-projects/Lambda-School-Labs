const Activities = require("./activities");

module.exports = {
  validateActivityId,
  validateNewActivity
};

// Checks whether or not an id is valid
function validateActivityId(req, res, next) {
  const { activityId } = req.params;

  Activities.getActivityById(activityId)
    .then(activity => {
      if (activity) {
        req.activity = activity;
        next();
      } else {
        return res.status(404).json({
          message: `Activity with the id ${activityId} does not exist.`
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        message: `Error occurred while getting activity with the id ${activityId}.`,
        error: err
      });
    });
}

function validateNewActivity(req, res, next) {
  const activity = req.body;

  if (!activity.name) {
    res
      .status(400)
      .json({ message: "Please provide the name of the activity" });
  } else if (!activity.date) {
    res.status(400).json({ message: "Please provide the date" });
  } else if (!activity.time) {
    res.status(400).json({ message: "Please provide the time" });
    // } else if (!activity.location) {
    //  res.status(400).json({ message: "Please provide the location of the activity" });
  } else if (!activity.organizer_id) {
    res.status(400).json({ message: "Error: organizer_id is required" });
  } else if (!activity.interest_id) {
    res.status(400).json({ message: "Error: interest_id is required" });
  } else {
    next();
  }
}
