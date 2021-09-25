const { User } = require('../Models');
const request = require("superagent");
require('dotenv').config()

const NON_INTERACTIVE_CLIENT_ID = "s9Qekd0RGrf7q6MzklrKi8n6R9HzKz06";
const NON_INTERACTIVE_CLIENT_SECRET = "09m5DSGrksPQf7WQq5OS3uTqY11l6RmLufxUGVoWvusF3Kf52Tb1ZUiE9UBOEXmO";


const authData = {
  client_id: NON_INTERACTIVE_CLIENT_ID,
  client_secret: NON_INTERACTIVE_CLIENT_SECRET,
  grant_type: 'client_credentials',
  audience: "https://venky-yagatilee.auth0.com/api/v2/"
};

function getTokenFromAuth0(req,res,next) {
  request
  .post('https://venky-yagatilee.auth0.com/oauth/token')
  .send(authData)
  .end(function(err, res) {
    if (res.body.access_token) {
      req.access_token = res.body.access_token;
      next();
    } else {
      res.send(401, 'Unauthorized');
    }
  });
}

module.exports = {getTokenFromAuth0};

