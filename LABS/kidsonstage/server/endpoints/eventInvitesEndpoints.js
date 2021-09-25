const express = require('express');

const invitesRouter = express.Router();

const db = require('../config/db.js');

invitesRouter.get('/events/:eventId/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .where('eventId', eventId)
    .where('userId', userId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: `No event of ${eventId} for user` });
    });
});

// GET EVENT ID FROM INVITE CODE
invitesRouter.get('/:inviteCode', function(req, res) {
  const { inviteCode } = req.params;

  db('events')
    .where('inviteCode', inviteCode)
    .select('id')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: `No event associated with invite code` });
    });
});

invitesRouter.get('/events/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .where('userId', userId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'No event invites for user' });
    });
});


invitesRouter.get('/events/:eventId', function(req, res) {
  const { eventId } = req.params;

  db('eventInvites')
    .where('eventId', eventId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'No users in event' });
    });
});

invitesRouter.post('/events/:eventId/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .insert({ eventId, userId })
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not Add user to group invites' });
    });
});

// ADD INVITED EVENT TO EVENTS USING INVITE CODE
invitesRouter.post('/:inviteCode/userId/:userId', function(req, res) {
  const { inviteCode, userId } = req.params;

  db('events')
    .where('inviteCode', inviteCode)
    .select('id')
    .then(function(records) {
      let eventId = records[0].id;

      db('eventInvites')
        .insert({ eventId, userId })
        .then(function(rec) {
          res.status(200).json(rec);
        })
        .catch(function(err) {
          res.status(500).json({ error: 'Could not Add user to group invites' });
        });
    })
    .catch(function(err) {
      res.status(500).json({ error: `No event associated with invite code` });
    });
});

invitesRouter.delete('/events/:eventId/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .where('eventId', eventId)
    .where('userId', userId)
    .del()
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not Add user to group invites' });
    });
});

module.exports = invitesRouter;
