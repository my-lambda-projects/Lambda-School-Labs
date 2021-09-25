const sgMail = require("@sendgrid/mail");
const Twilio = require("twilio");

const sendEmailNotification = (req, res) => {
  const { email, text } = req.body;
  console.log("Request Body:", req.body);

  const sendgridKey = process.env.SENDGRID_API_KEY || "default_sendgrid_key";
  sgMail.setApiKey(sendgridKey);
  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: "Sending with SendGrid is Fun",
    text,
  };
  sgMail.send(msg, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Yay! Our templated email has been sent", response);
      res.json("Email notification sent!");
    }
  });
};

const sendSmsNotification = (req, res) => {
  let { phoneNumber, text } = req.body;
  if (phoneNumber.length === 10) {
    phoneNumber = `+1${phoneNumber}`;
  }
  console.log("Request Body:", req.body);

  const accountSid = process.env.TWILIO_ACCOUNT_SID || "default_twilio_sid"; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN || "default_twilio_authToken"; // Your Auth Token from www.twilio.com/console
  const client = new Twilio(accountSid, authToken);

  client.messages
    .create({
      body: text,
      to: phoneNumber, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
      console.log(message.sid);
      res.json("SMS notification sent!");
    })
    .catch(err => console.log(err));
};

module.exports = {
  sendEmailNotification,
  sendSmsNotification,
};
