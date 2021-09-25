const Meetup = require('../models/meetupModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mySecret = process.env.SECRET || "random";

const getAllMeetups = async (req, res) => {
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

  Meetup.find({ user })
    .then(meetups => res.json(meetups))
    .catch(err => res.status(500).json({ error: 'Error fetching Meetups' }));
  });
};

const destroyMeetup = (req, res) => {
  const { id } = req.body;
  Meetup.findByIdAndRemove(id, (err, removedMeetup) => {
    if (err) {
      res.status(422).json({ error: 'Cannot find meetup by that id' });
    }
    res.status(200).json({ success: `${removedMeetup.eventName} was removed from the db` });
  }
);
}

//still needs to be implemented
const getMeetup = (req, res) => {
  const { username, _id } = req.body;
  if (username && _id) {
    Meetup.find({ username, _id })
      .then(meetup => res.json(meetup))
      .catch(err => res.status(500).json({ error: 'Error fetching the meetup' }));
  } else {
    res.status(422).send('Please send valid _id and username');
  }
};

const createMeetup = async (req, res) => {
  const { dateOfEvent, eventName, token } = req.body;
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
    if (dateOfEvent && eventName && user) {
      const newMeetup = new Meetup ({ ...req.body, user });
      newMeetup.save()
        .then(meetUp => res.json(meetUp))
        .catch(err => res.status(500).json({ error: 'Error saving the meetup' }));
    } else {
      res.status(400).json({ error: 'Please send valid date and name for event' });
    }
  });
};

module.exports = {
  getAllMeetups,
  getMeetup,
  createMeetup,
  destroyMeetup,
};
