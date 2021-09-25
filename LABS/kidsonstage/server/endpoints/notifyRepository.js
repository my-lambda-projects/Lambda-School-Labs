const moment = require('moment');

import { twilioDispatch } from './dispatch/twilioDispatch';
import { sendGridDispatch } from './dispatch/sendGridDispatch';

export function notifyFunction(data) {
  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;
    const currentTime = moment('11:45:00', 'HH:mm:ss');
    const time = moment(data[i].time, 'HH:mm:ss');
    
    let difference = time.diff(currentTime, 'minutes').toString();
    let emailArr = [];
    let phoneArr = [];
    
    // LOOK AT CONTACT INFO OF SUBSCRIBERS
    for (let j = 0; j < data[i].subscribers.length; j++) {
      // BUILD EMAIL ARRAY
      if ('email' in data[i].subscribers[j]) emailArr.push(data[i].subscribers[j].email);

      // BUILD PHONE NUMBER ARRAY
      if ('phoneNumber' in data[i].subscribers[j]) phoneArr.push(data[i].subscribers[j].phoneNumber);
    }
    
    if (emailArr.length > 0) {
      sendGridDispatch(emailArr, name, difference);
    }
    if (phoneArr.length > 0) {
      twilioDispatch(phoneArr, name, difference);
    }
  }
}


