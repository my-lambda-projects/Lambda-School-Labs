const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));

server.use(express.json());

const STATUS_SUCCESS = 200;
const SERVER_ERROR = 500;

const { stripeAuth, sendSMS } = require('../../models/models');

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

// Handles POST api call, sends token to Stripe
// waits for CC auth and then sends on the message
// content to Twilio if CC Auth is successful.
server.post('/send', (req, res) => {
  const { token } = req.body;
  const { message, recipient } = req.body;

  stripeAuth(token)
    .then((stripeData) => {
      // Because these functions (stripeAuth and sendSMS) work one after another
      // every time, I had to use promises to ensure the twilio message doesn't
      // get sent until the Stripe Auth returns. Because of this, the errors
      // don't always return properly from the functions. This necessitates
      // checking for the status code when the function returns and then
      // returning the errors correctly.

      // The benefit of this is we can pass along the status codes and error
      // messages from Stripe and Twilio

      if (stripeData.statusCode > 204) {
        res.status(stripeData.statusCode).json({ error: stripeData.message });
      }
      sendSMS(message, recipient).then((data) => {
        if (data.status > 204) {
          res.status(data.status).json({ error: data.message });
        } else {
          res
            .status(STATUS_SUCCESS)
            .json({ success: 'Your message was successfully sent.' });
        }
      });
    })
    .catch(error => res.status(SERVER_ERROR).json({ error: error.message }));
});

module.exports = server;
