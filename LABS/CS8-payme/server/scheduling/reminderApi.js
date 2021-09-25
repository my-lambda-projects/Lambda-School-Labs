const Twilio = require('twilio');

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const emailusername = process.env.EMAIL_USERNAME;
const emailpassword = process.env.EMAIL_PASSWORD;

const host = process.env.HOST;

const send = {
  sendSMS: function(reminder) {
    const client = new Twilio(accountSid, authToken);

    console.log('inside sender', reminder);

    let body = `PAy me`;
    if (reminder.message) {
      body = `${reminder.message} Link to pay: ${host}/payinvoice/${
        reminder.invoiceId
      }`;
    } else {
      body = `${
        reminder.company
      } is asking for a payment. You can pay at: ${host}/payinvoice/${
        reminder.invoiceId
      }`;
    }
    const options = {
      to: `+1${reminder.phoneNumber}`,
      from: twilioNumber,
      body,
    };

    // send message
    client.messages.create(options, function(err, response) {
      if (err) {
        // just log for now
        console.log(err);
      }

      if (response) {
        let masked = reminder.phoneNumber.substr(
          0,
          reminder.phoneNumber.length - 5
        );
        masked += '*****';
        // log who it was sent to with asterisk
        console.log(`Message sent to ${masked}`);
      }
    });
  },

  sendEmail: function(reminder) {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.log(`${err} Failed at creating test account`);
      }

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: emailusername,
          pass: emailpassword,
        },
      });

      transporter.use(
        'compile',
        hbs({
          viewPath: './server/controllers/email',
          extName: '.hbs',
        })
      );

      if (reminder.email === undefined)
        console.log({ error: 'No email found on Invoice.' });
      // setup email data with unicode symbols
      let mailOptions = {
        from: `"Give Me My Money"${emailusername}`,
        to: `${reminder.email}`,
        subject: 'You Have An Outstanding Invoice',
        template: 'body',
        context: {
          // _______________________________placeholders
          URL: `${host}`,
          invoice: `${reminder.invoiceId}`,
          name: `${reminder.name}`,
          amount: `${reminder.amount}`,
          company: `${reminder.company}`,
        }, // html body
      };
      console.log(`This email is: ${reminder.email}`);
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(` Error sending the Email ${err}`);
        }
        console.log('Message sent');
      });
    });
  },
};

module.exports = send;
