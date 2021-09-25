const Joi = require("@hapi/joi");

// Takes in a schema, checks req body against it, and returns middleware that throws a 400 or moves on to the next
module.exports = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).json({
        error: `Error during ${req.method} at ${req.originalUrl}: ${error.details[0].message}`
      });
    }
    next();
  };
};
