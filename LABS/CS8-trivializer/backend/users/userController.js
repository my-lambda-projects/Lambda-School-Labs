const express = require("express");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("./userModel.js");

const auth = require('../auth/authController');

  router  
  .post('/update-token',(req, res) => {
      console.log("UPDATE TOKEN BODY:",req.body.user)
    // res.status(200).json(auth.data.newToken({token: req.body.user}))
    res.status(200).json(auth.data.newToken({token: req.body.user}))  
  })

router
  .route("/update")

  .put((req, res) => {
    const { id } = req.body;
    const settings = req.body.formProps;
    let { hashedPassword } = req.body;
    let { oldPassword, password, email, orgName } = req.body.formProps;

    let matched = null;

    console.log("PASSWORD:", password);
    console.log("HASHED OLD PASSWORD", hashedPassword);

    if(oldPassword === undefined || hashedPassword === undefined) {
      matched = false;
    } else {
      matched = bcrypt.compareSync(oldPassword, hashedPassword);
    }


    if (oldPassword === undefined || password === undefined) {
      User.findByIdAndUpdate(id, settings)
        .then(updated => {
          if (updated === undefined) {
            res.status(404).json(updated);
          } else {
            console.log("USER WITH NO PW CHANGE", updated);
            res.status(200).json(updated);
          }
        })
        .catch(err => {
          res.status(500).json("error updating user information", err);
        });
    }


    if (matched) {
      console.log("PASSWORD", password);
      password = bcrypt.hashSync(password, 10);
      console.log("PASSWORD AFTER BCRYPT", password);
      User.findByIdAndUpdate(id, {password, email: email, orgName: orgName}) //{email} new syntax later
        .then(updated => {
          if (updated === undefined) {
            res.status(404).json(updated);
          } else {
            res.status(200).json(updated);
          }
        })
        .catch(err => {
          res.status(500).json("error updating user information", err);
        });
    }





    
  });
module.exports = router;
