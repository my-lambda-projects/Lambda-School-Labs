const Contribution = require('../models/contributionModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mySecret = process.env.SECRET || "random";

const getAllContributions = async (req, res) => {
  const { token } = req.headers;
  const storedPayload = await jwt.verify(token, mySecret);
  const email = storedPayload.email;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Error finding user' });
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that id in our records' });
      return;
    }

  Contribution.find({ user })
    .then(contributions => res.json(contributions))
    .catch(err => res.status(500).json({ error: 'Error fetching Meetups' }));
  });
};

const destroyContribution = (req, res) => {
  const { id } = req.body;
  Contribution.findByIdAndRemove(id, (err, removedContribution) => {
    if (err) {
      res.status(422).json({ error: 'Cannot find meetup by that id' });
    }
    res.status(200)
      .json({ success: `${removedContribution.contributionName} was removed from the db` });
  }
);
}

// still needs to be implemented
const getContribution = (req, res) => {
  const { username, _id } = req.body;
  if (username && _id) {
    Contribution.find({ username, _id })
      .then(contribution => res.json(contribution))
      .catch(err => res.status(500).json({ error: 'Error fetching the meetup' }));
  } else {
    res.status(422).send('Please send valid _id and username');
  }
};

const createContribution = async (req, res) => {
  const { dateOfContribution, contributionName, token } = req.body;
  const storedPayload = await jwt.verify(token, mySecret);
  const email = storedPayload.email;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid user id' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that id in our records' });
      return;
    }
    if (dateOfContribution && contributionName && user) {
      const newContribution = new Contribution ({ ...req.body, user });
      newContribution.save()
        .then(contrib => res.json(contrib))
        .catch(err => res.status(500).json({ error: 'Error saving the meetup' }));
    } else {
      res.status(400).json({ error: 'Please send valid date and name for event' });
    }
  });
};

module.exports = {
  getAllContributions,
  getContribution,
  createContribution,
  destroyContribution,
};
