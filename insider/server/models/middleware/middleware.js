const {
  TWILIO_FROM,
  STRIPE_KEY,
  TWILIO_TOKEN,
  TWILIO_SID,
} = process.env;

const STATUS_USER_ERROR = 422;


// Checks to see if the proper API keys are in the .env file
const envCheck = (req, res, next) => { // eslint-disable-line 
  if (
    TWILIO_SID !== undefined &&
    TWILIO_TOKEN !== undefined &&
    TWILIO_FROM !== undefined &&
    STRIPE_KEY !== undefined
  ) {
    next();
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error:
        'Please add Stripe Key, Twilio SID, Twilio Token, and Twilio "From" variable to your .env file.',
    });
  }
};

module.exports = {
  envCheck,
};
