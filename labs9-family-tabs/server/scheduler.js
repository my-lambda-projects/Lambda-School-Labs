const CronJob = require("cron").CronJob;
const axios = require("axios");
const moment = require("moment");
const express = require("express");
const server = express();

// ========= NODE-CRON =========//

//console.log("Before job instantiation");
const cron = () =>{





  const job = new CronJob("*/10 * * * * *", function() {


  axios
    .get(`${process.env.SERVER_API_URL}/scheduledEventNameWithUsers`)
    .then(events => {
      console.log("EVENTS.DATA",events.data);
      events.data.map(event => {
        let today = moment();
        let eventDate = moment(event.eventStart, "YYYYMMDD, h:mm a");
        let eventReminder = {
          title: event.scheduledEvent_name,
          start: event.eventStart,
          phone: event.phone,
          allDay: true
        };

        if (eventDate.diff(today, "days") === 0 && event.dayAlert === 0 && event.textCheckbox === 1) {
          console.log("IF FIRING")
          axios
            .post(`${process.env.SERVER_API_URL}/text`, eventReminder)
            .then(resp => {
              console.log(resp);
            })
            .catch(err => {
              console.log(err);
            });

          let eventAlert = {
            dayAlert: true
          };

          axios
            .put(`${process.env.SERVER_API_URL}/event/edit/${event.id}`, eventAlert)
            .then(resp => {
              console.log("RUNNING", resp);
            })
            .catch(err =>  {
              console.log("ERROR", err);
            });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

  job.start();
}

module.exports = cron