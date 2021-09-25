const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const creds = require('./config/keys.js');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: creds.nodemailer.USER,
        pass: creds.nodemailer.PASS
    }
});



transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});


router.post('/', (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const message = `${name} your landlord has created your Tenantly Account`
    var content = `${name} you can access your account by going to this link and using your email the following password: ${password}`
  
    const mail = {
      from: name,
      to: email,  //Change to email address that you want to receive messages on
      subject: message,
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })
  module.exports = router;