const express = require("express");

const Users = require("../models/users");

const router = express.Router();

const validation = require("../middleware/dataValidation");
const userValidation = require("../middleware/user-middleware");
const Notifications = require("../models/notifications");
const Invitees = require("../models/group_invitees");
const Requests = require("../models/private_group_request");

const { userSchema } = require("../schemas");

router.route("/").get(async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    users,
  });
});

router
  .route("/:id")
  .put(validation(userSchema), async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const userExists = await Users.find({ id }).first();
    if (!userExists) {
      res.status(404).json({ message: "That user does not exist." });
    } else {
      try {
        const updated = await Users.update({ id }, changes);
        res.status(200).json({ updated });
      } catch (err) {
        res.status(500).json({ err });
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    const deleted = await Users.remove({ id });
    if (deleted) {
      res.status(200).json({ message: "The user has been deleted." });
    } else {
      res.status(404).json({ message: "That user does not exist." });
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    const user = await Users.find({ id }).first();
    if (user && user.id) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "That user does not exist." });
    }
  });

router
  .route("/:id/invites")
  .all(userValidation.validateUserId)
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const invites = await Invitees.findByUserId(id);
      res.status(200).json(invites);
    } catch (err) {
      res.status(500).json({ err });
    }
  });

router
  .route("/:id/group_requests")
  .all(userValidation.validateUserId)
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const requests = await Requests.findByUserId(id);
      res.status(200).json(requests);
    } catch (err) {
      res.status(500).json({ err });
    }
  });

router
  .route("/:id/notifications")
  .all(userValidation.validateUserId)
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const notifications = await Notifications.findByUserId(id);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ err });
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const { invoker_id, type_id, type } = req.body;
      const postNotification = await Notifications.addToUser(
        id,
        invoker_id,
        type_id,
        type
      );
      res.status(201).json(postNotification);
    } catch (err) {
      res.status(500).json({ err });
    }
  });
// .delete(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteNotification = Notifications.remove(id);
//     res.status(200).json(deleteNotification);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

module.exports = router;
