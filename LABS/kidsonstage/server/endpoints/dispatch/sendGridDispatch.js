require('dotenv').config({path: '../../.env'});

const sgMail = require('@sendgrid/mail');
const moment = require('moment');

export function sendGridDispatch(emailArr, name, difference) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  console.log(difference);

  let message = {
    to: emailArr,
    from: 'notify@whenismykidonstage.com',
    templateId: 'b3f63a64-a93a-4678-bfdc-4185f796989f',
    substitutions: {
      group: name,
      remaining: difference
    }
  };

  // DISABLED UNTIL LIVE
  sgMail.sendMultiple(message);
}