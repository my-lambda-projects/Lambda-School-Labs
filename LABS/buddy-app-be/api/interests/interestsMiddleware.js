const Interests = require("./interests");

module.exports = {
  validateInterest,
  validateUserInterest
};

// checks if an interest exists
function validateInterest(req, res, next) {
  let id = req.params.interestid || req.body.interests_id;

  Interests.getInterestById(id)
    .then(interest => {
      if (interest) {
        req.interest = interest;
        next();
      } else {
        res.status(400).json({ message: "Invalid Interest ID" });
      }
    })
    .catch(err => res.status(500).json(err));
}

// checks to see if a specific interest is associated to a specific user
function validateUserInterest(req, res, next) {
  let userId = req.params.userid;
  let interestId = req.params.interestid;

  Interests.getUserInterests(userId)
    .then(userInterest => {
      const interests = userInterest.map(interest => interest.interests_id);

      if (interests.includes(Number(interestId))) {
        next();
      } else {
        res
          .status(400)
          .json({ message: "That Interest isn't associated to this User" });
      }
    })
    .catch(err => res.status(500).json(err));
}
