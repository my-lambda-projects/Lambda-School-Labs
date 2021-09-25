const express = require('express');
const Timestamp = require('./timestampSchema');
const Client = require('../client/clientSchema');
const Vendor = require('../vendor/vendorSchema');
const timestampRouter = express.Router();
const moment = require('moment');
const authenticate = require('../utils/middlewares');

timestampRouter.post('/start', (req, res) => {
  // client id vendor id
  const { vendorId, clientId } = req.body;
  if (vendorId && clientId) {
    const newTStamp = new Timestamp({
      client: clientId,
      vendor: vendorId,
      startTime: new Date()
    });
    newTStamp.save();
    Vendor.findOneAndUpdate(
      { _id: vendorId },
      { $push: { hoursLogged: newTStamp._id } },
      { new: true }
    ).then(vendor => {
      Client.findOneAndUpdate(
        { _id: clientId },
        { $push: { hoursLogged: newTStamp._id } }
      ).then(client => {
        res.status(200).json(newTStamp);
      });
    });
    // push this id to vendor timestamp array
  } else {
    res.status(422).json({ error: 'must include vendorId and clientId' });
  }
});

// stop timer using timestamp id and push to clients hourslogged
timestampRouter.put('/stop', (req, res) => {
  const { timestampId } = req.body;
  Timestamp.findOneAndUpdate(
    { _id: timestampId },
    { endTime: new Date(), active: false }
  )
    .then(timestamp => {
      const start = moment(timestamp.startTime);
      const end = moment(timestamp.endTime);
      const duration = moment.duration(end.diff(start));
      const formatted = moment(duration._data).format('HH:mm');
      let mins = Number(formatted.slice(0).split(':')[1]);
      let hours = 0 || Number(formatted.slice(0).split(':')[0]);

      if (mins <= 7) {
        mins = '00';
      } else if (mins > 7 && mins <= 22) {
        mins = 15;
      } else if (mins > 22 && mins <= 37) {
        mins = 30;
      } else if (mins > 37 && mins <= 52) {
        mins = 45;
      } else {
        mins = '00';
        hours += 1;
      }

      const newDuration = `${hours.toString()}:${mins.toString()}`;
      timestamp.duration = newDuration;
      timestamp.save();
      res.status(200).json(timestamp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Create new timestamp
timestampRouter.post('/', (req, res) => {
  const timestamp = new Timestamp(req.body);
  timestamp.save((err, timestamp) => {
    if (err) return res.send(err);
    res.json({ success: 'Timestamp saved', timestamp });
  });
});

//Get an timestamp by id
timestampRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Timestamp.findById(id)
    .populate('client')
    .then(timestamp => {
      res.status(200).json(timestamp);
    })
    .catch(err => {
      res.status(500).json({ error: `Could not access DB ${err}` });
    });
});

//Update timestamp
timestampRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { newTimestamp, endTime, duration } = req.body;
  Timestamp.findOneAndUpdate(
    { _id: id },
    {
      comments: newTimestamp.comments,
      endTime,
      duration
    },
    { new: true }
  )
    .then(timestamp => {
      res.status(200).json(timestamp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Remove
timestampRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Timestamp.findByIdAndRemove(id)
    .then(removedTimestamp => {
      if (removedTimestamp) {
        res.status(200).json(removedTimestamp);
      } else {
        res
          .status(404)
          .json({ message: `Could not find timestamp with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while removing timestamp: ${err}` });
    });
});

module.exports = timestampRouter;
