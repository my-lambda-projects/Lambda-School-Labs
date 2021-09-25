const { TWILIO_FROM, STRIPE_KEY, TWILIO_TOKEN, TWILIO_SID } = process.env;

const Twilio = require('twilio');
const stripe = require('stripe')(STRIPE_KEY);
const fs = require('fs');
const path = require('path');

const stripeAuth = (token) => {
  // eslint-disable-line
  return new Promise((resolve, reject) => {
    // eslint-disable-line
    return stripe.charges
      .create({
        amount: '0100',
        currency: 'usd',
        description: 'New Transaction',
        source: token,
      })
      .then(response => resolve(response))
      .catch((err) => {
        reject(err);
      });
  }).catch((err) => {
    console.error(err);
    return err;
  });
};

const sendSMS = (message, recipient) => {
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
  return client.messages
    .create({
      body: message,
      to: recipient,
      from: TWILIO_FROM,
      statusCallback: 'https://www.ghosttexts.com/api/twilio-status/',
    })
    .then(response => response)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const messagesFeed = () => {
  const filePath = path.join(__dirname, '/messages/', 'messages.json');
  const file = fs.createWriteStream(filePath);
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
  const limit = 10;
  const arr = {
    messages: [],
  };
  return new Promise((resolve, reject) => {
    return client.messages.each({ limit }, (msg) => {
      const { body, sid } = msg;
      const message = {
        body,
        sid,
      };
      arr.messages.push(message);
      if (arr.messages.length === limit) {
        const content = JSON.stringify(arr);
        file.write(content);
      }
    });
  });
};
module.exports = {
  sendSMS,
  stripeAuth,
  messagesFeed,
};
