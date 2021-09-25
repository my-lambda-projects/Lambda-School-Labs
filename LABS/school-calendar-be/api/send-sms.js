require('dotenv').config();
const accountSid = process.env['TWILIO_ACCOUNT_SID']; 
const authToken = process.env['TWILIO_AUTH_TOKEN']; 

// twilio set up to send messages and add .env authorization
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

// sends sms message 
const sendMessage = (phoneNumber, message) => {
    client.messages.create({
    to: phoneNumber, // my phone number
    from: process.env['TWILIO_NUMBER'], // assigned twilio phone number
    body: message
})
.then((message) => console.log(message.sid))
}

// Fetch and view the sms already sent
// Add link from terminal to .messages('') 
const fetchMessage = () => {
    client.messages('')
      .fetch()
      .then(message => console.log(message.to))
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: 'Error retrieving SMS message' });
      });
    }

// // Delete the message sent
const deleteMessage = () => {
    client.messages('').remove()
    .then(removed => {
        console.log(removed)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting SMS message' });
    });
}

module.exports = {
    sendMessage, 
    fetchMessage,
    deleteMessage
};
