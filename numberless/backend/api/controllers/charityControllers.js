const mongoose = require('mongoose');

const Charity = require('../models/CharityModel');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const createCharity = (req, res) => {
  const { 
    charity,
    image,
    description,
    } = req.body;
  const winner = false;
  const active = false;
  const votes = 0;
  const newCharity = new Charity({ 
    charity, 
    image,
    description,
    winner,
    active,
    votes
   });
  newCharity
    .save()
    .then(createdCharity => res.json(createdCharity))
    .catch(err => res.status(STATUS_SERVER_ERROR).json(err))
};

const getCharities = (req, res) => {
  Charity.find({}, (err, charities) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ "Error retrieving Charities": err});
      return;
    }
    res.json(charities);
  })
};

const getCharity = (req, res) => {
  const { id } = req.params;
  Charity.findOne( { "_id": id }, (err, charity) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ "Error retrieving charity": err});
      return;
    }
    res.json(charity);
  })
};

const updateCharity = (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;
  Charity.findOneAndUpdate(
    { "_id": id },
    { $inc: { "votes": vote }}
  )
    .exec((err, charity) => {
      if (err) {
        res.status(STATUS_USER_ERROR).json({ "Could not find charity: ": err});
        return;
      }
      res.json(charity);
    })
};

module.exports = {
  createCharity,
  getCharity,
  getCharities,
  updateCharity
}