const express = require("express");

const router = express.Router();

const notifyValidation = require("../middleware/notification-middleware");
const Notifications = require("../models/notifications");

router
  .all(notifyValidation.validateNotifyId)
  .route("/:id")
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Notifications.remove(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err });
    }
  });

module.exports = router;
