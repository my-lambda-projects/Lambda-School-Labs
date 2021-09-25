const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const whitelist = ['http://localhost:3000', 'https://family-tabs.netlify.com']

const corsOptions = {origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }};

const middleware = app =>{
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.json()) 
    return app
}

module.exports = middleware;