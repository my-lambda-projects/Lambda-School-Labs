const express = require("express");
const router = express.Router();
const Taxjar = require("taxjar");
require("dotenv").config();

router.get("/:zip", (req, res) => {
  const { zip } = req.params;
  const client = new Taxjar({
    apiKey: process.env.TAX_API
  });
  if (zip) {
    // get tax by zip
    client
      .ratesForLocation(zip)
      .then(rates => {
        res.status(201).json({ rate: rates.rate });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Either no zip data given or network interruption" });
      });
  }
});

module.exports = router;
