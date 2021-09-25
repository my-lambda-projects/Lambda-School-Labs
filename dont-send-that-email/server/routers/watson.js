const express = require("express");
const populateUser = require("../middlewares/populateUser");
const db = require("../data/dbconfig.js");
const router = express.Router();
const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");

router.use(populateUser);

//this sets up the tone analyzer. We use it in the get request.
const toneAnalyzer = new ToneAnalyzerV3({
  version: "2017-09-21",
  iam_apikey: process.env.API_KEY,
  url: "https://gateway.watsonplatform.net/tone-analyzer/api"
});

router.post("/", (req, res) => {
  const toneParams = {
    tone_input: { text: req.body.text },
    content_type: "application/json"
  };

  toneAnalyzer.tone(toneParams, (err, data) => {
    if (err) {
      //add a better error message.
      res
        .status(500)
        .json({ message: "Sorry, watson is not talking to us right now", err });
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = router;
