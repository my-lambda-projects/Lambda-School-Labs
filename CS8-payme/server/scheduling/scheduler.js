const schedule = require('node-schedule');
const sender = require('./reminderApi');

const scheduler = function() {
  return {
    scheduleSEND: function(reminder) {
      /**********************************
        Break down date object 
      */
      const initialSend = new Date(reminder.days);
      const startNumb = initialSend.getDay(); // 0-6 starts at sunday
      const startDate = initialSend.getDate(); // 1-31
      const startHour = initialSend.getHours();
      const startMinute = initialSend.getMinutes();
      const startMonth = initialSend.getMonth();
      /*********************************/

      const remId = reminder._id.toString();

      /***********************************
       * CUSTOM scheduler
       */
      if (reminder.remind === 'custom') {
        // let rule = new schedule.RecurrenceRule();
        let job = schedule.scheduleJob(remId, initialSend, function() {
          console.log('schdler' + reminder);
          reminder.isEmail === true
            ? sender.sendEmail(reminder)
            : sender.sendSMS(reminder);
        });
      }
      /*******************************/

      /***********************************
       * Sends reminder DAILY
       */
      if (reminder.remind === 'daily') {
        // send on day and time selected. Will send sun - sat
        let rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [startNumb, new schedule.Range(0, 6)];
        rule.hour = startHour;
        rule.minute = startMinute;

        let job = schedule.scheduleJob(remId, rule, function() {
          reminder.isEmail === true
            ? sender.sendEmail(reminder)
            : sender.sendSMS(reminder);
        });
      }
      /**********************************/

      /***********************************
       * Sends reminder WEEKLY
       */
      if (reminder.remind === 'weekly') {
        // Sends 11:30am every week on selected day
        let job = schedule.scheduleJob(
          remId,
          { hour: startHour, minute: startMinute, dayOfWeek: startNumb },
          function() {
            reminder.isEmail === true
              ? sender.sendEmail(reminder)
              : sender.sendSMS(reminder);
          }
        );
      }
      /**********************************/

      /***********************************
       * Send reminder MONTHLY
       */
      if (reminder.remind === 'monthly') {
        let rule = new schedule.RecurrenceRule();
        rule.month = [startMonth, new schedule.Range(0, 11)];
        rule.hour = startHour;
        rule.minute = startMinute;

        let job = schedule.scheduleJob(remId, rule, function() {
          reminder.isEmail === true
            ? sender.sendEmail(reminder)
            : sender.sendSMS(reminder);
        });
      }
      /**********************************/
    },

    /**************************************
     * Call to cancel job by reminder Id
     */
    cancelSEND: function(reminderId) {
      let remId = reminderId.toString();
      let schJob = schedule.scheduledJobs[remId];
      schJob.cancel();
    },
    /**********************************/
  };
};

module.exports = scheduler();
