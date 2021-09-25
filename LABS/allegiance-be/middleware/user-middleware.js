const Users = require("../models/users");

module.exports = {
  validateUserId
};

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await Users.find({ id }).first();
  if (user && user.id) {
    next();
  } else {
    res.status(404).json({ message: "This user does not exist." });
  }
}
