require('dotenv').config({path: '../../.env'});

export function twilioDispatch(phoneArr, name, difference) {
  // Twilio Credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const sendingNumber = process.env.TWILIO_NUMBER;
  
  // Require the twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken);

  
  // LOOP THROUGH NUMBERS
  for (let i = 0; i < phoneArr.length; i++) {
    let formatedNumber = 1 + phoneArr[i].split('-').join('');
    let message;

    if (difference == '0') {
      message = "ALERT - Your group: " + name + " will begin momentarily. Don't miss out!";
    } else {
      message = "A group has completed the event, and you have moved up a position. Your group: " + name + " has an estimated starting time of " + difference + " minutes.";
    }
    
    // DISABLED UNTIL LIVE
    client.messages
      .create({
        to: formatedNumber,
        from: sendingNumber,
        body: message
      })
      .then(function(data) {
        console.log('Administrator notified');
      }).catch(function(err) {
        console.error('Could not notify administrator');
        console.error(err);
      });
  }
}



