const express = require('express');

const eventsRouter = express.Router();

const db = require('../config/db.js');

const requireAuth = require('../services/passport').requireAuth;


import { codeGen } from './utilities/codeGen';

eventsRouter.get('/', function(req, res) {
  db('events')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve any events' });
    });
});

eventsRouter.post('/', function(req, res) {
  const { owner, title, eventDate } = req.body;
  // ADD FUNCTION FOR SETTING TIME / FRONT END CALANDER PICKER
  db('events')
    .insert({ owner, title, eventDate })
    .returning('id')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not add new event to DB', err });
    });
});

eventsRouter.delete('/', function(req, res) {
  const { id } = req.body;

  db('events')
    .where('id', id)
    .del()
    .then(function(records) {
      res.status(200).json(id);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not delete event from DB', err });
    });
});

eventsRouter.get('/byUser/:userId', requireAuth, function(req, res) {
  const { userId } = req.params;

  db('events')
    .where('owner', userId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'No events by that owner ID' });
    });
});

eventsRouter.get('/:eventId', function(req, res) {
  const { eventId } = req.params;

  db('events')
    .where('id', eventId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res
        .status(500)
        .json({ error: 'Could not retrieve any events by that ID' });
    });
});

eventsRouter.get('/:eventId/activate', function(req, res) {
  const { eventId } = req.params;

  db('events')
    .where('id', eventId)
    .select('activated')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Active record does not exist', err });
    });
});

eventsRouter.put('/:eventId/activate', function(req, res) {
  const { eventId } = req.params;
  const { status } = req.body;
  console.log(`eventId ${eventId} status: ${status}`);
  if (status === 'succeeded') {
    db('events')
      .where('id', eventId)
      .select('activated')
      .update({
        activated: true,
        inviteCode: codeGen(eventId)
      })
      .then(function(records) {
        res.status(200).json(records);
      })
      .catch(function(err) {
        console.log(`activate ${err}`);
        res.status(500).json({ error: 'Could not activate event', err });
      });
  } else {
    res.status(500).json({ error: 'Event must be paid for' });
  }
});

eventsRouter.get('/:eventId/groups', function(req, res) {
  const { eventId } = req.params;

  db('groups')
    .where('eventId', eventId)
    .orderBy('time')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res
        .status(500)
        .json({ error: 'Could not return any groups owned by event', err });
    });
});

eventsRouter.post('/:eventId/groups', function(req, res) {
  const { eventId } = req.params;
  const { name, time } = req.body;
  console.log(`addGroup ${eventId} name: ${name} time: ${time}`);
  db('groups')
    .insert({ eventId, name, time })
    .returning('id')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not create new group', err });
    });
});

eventsRouter.get('/:eventId/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventSubscribers')
    .where('eventId', eventId)
    .where('userId', userId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res
        .status(500)
        .json({ error: 'Could not return any subscribers in that group', err });
    });
});

eventsRouter.post('/:eventId/groups/:groupId', function(req, res) {
  const { eventId, groupId } = req.params;
  const { userId, subscribed } = req.body;

  db('eventSubscribers')
    .insert({ eventId, groupId, userId, subscribed })
    .returning('id')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      // COME BACK HERE AND ADD MORE ERROR CATCHES FOR ALREADY SUBSCRIBED, NO EVENT, ETC
      console.log(`eventSubscribers insert ${err}`);
      res.status(500).json({ error: 'Could not subscribe to group', err });
    });
});
eventsRouter.get('/:eventId/groups/:groupId/userId/:userId', function(req, res) {
  const { eventId, groupId, userId } = req.params;

  db('eventSubscribers')
    .where({ eventId, groupId, userId })
    .then(rows => 
      res.status(200).json(rows)
    )
    .catch(function(err) {
      // COME BACK HERE AND ADD MORE ERROR CATCHES FOR ALREADY SUBSCRIBED, NO EVENT, ETC
      console.log(`eventSubscriber not found ${err}`);
      res.status(204).json({ error: 'Could not find subscriber', err }); // no content
    });
});


eventsRouter.put('/:eventId/groups/:groupId', function(req, res) {
  const { eventId, groupId } = req.params;
  const { name, time, completed } = req.body;

  db('groups')
    .where('eventId', eventId)
    .where('id', groupId)
    .update({ name, time, completed })
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res
        .status(500)
        .json({ error: 'Could not return any groups owned by event', err });
    });
});

eventsRouter.delete('/:eventId/groups/:groupId', function(req, res) {
  // delete group
  const { eventId, groupId } = req.params;

  db('groups')
    .where('eventId', eventId)
    .where('id', groupId)
    .del()
    .then(function(records) {
      res.status(200).json(groupId);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not delete group from DB', err });
    });
});

eventsRouter.delete('/:eventId/groups/:groupId/userId/:userId', function(
  req,
  res
) {
  // Deletes subscriber from eventSubscribers
  const { eventId, groupId, userId } = req.params;

  db('eventSubscribers')
    .where('eventId', eventId)
    .where('groupId', groupId)
    .where('userId', userId)
    .del()
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res
        .status(500)
        .json({ error: 'Could not delete subscriber from group', err });
    });
});
eventsRouter.put('/:eventId/groups/:groupId/userId/:userId', function(
  req,
  res
) {
  // sets eventSubscribers subscribed value
  const { eventId, groupId, userId } = req.params;
  const { subscribed } = req.body;

  db('eventSubscribers')
    .where({ eventId, groupId, userId })
    .update({ subscribed })
    .select('id')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res
        .status(500)
        .json({ error: 'Could not delete subscriber from group', err });
    });
});

module.exports = eventsRouter;
