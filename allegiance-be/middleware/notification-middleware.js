const Notifications = require("../models/notifications");

module.exports = {
  validateNotifyId
};

async function validateNotifyId(req, res, next) {
  const { id } = req.params;
  try {
    const notify = await Notifications.find(id);
    if (notify && notify.id) {
      next();
    } else {
      res.status(404).json({ message: "This notification does not exist." });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
}
