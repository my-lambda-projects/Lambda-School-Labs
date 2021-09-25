require("dotenv").config();
const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", (req, res) => {
  res.send("Hello, world");
});

router.post("/send", (req, res) => {
  // Pull in data from frontend
  const { to, from, subject, text, html, url } = req.body;
  // construct send message
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
    template_id: "d-cfdd9e9c01914f909b38fef4016bba70",
    dynamic_template_data: {
      toemail: to,
      fromemail: from,
      body: text,
      URL: url
    }
  };
  // send message
  sgMail.send(msg);
  //
  // Construct Confirmation message
  const confirmationmsg = {
    to: from,
    from: "noreply@movebytes.com",
    subject: subject,
    text: text,
    html: html,
    template_id: "d-c8e5c984923a482e97c0e69f2b4cfe5b",
    dynamic_template_data: {
      toemail: to,
      fromemail: from,
      body: text,
      URL: url
    }
  };
  //send Confirmation message
  sgMail.send(confirmationmsg);

  //send res to frontend
  console.log("email sent");
  res.send("Email Sent");
});

module.exports = router;
