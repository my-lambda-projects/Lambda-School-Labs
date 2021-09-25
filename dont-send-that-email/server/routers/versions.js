const express = require("express")
const populateUser = require("../middlewares/populateUser");
const db = require("../data/dbconfig.js");
const router = express.Router();

router.use(populateUser);

// Required fields: {
//   email_id,
//   text,
//   tone_analysis
// }
router.post('/', (req, res) => {
  db("versions")
    .insert(req.body)
    .then(() => res.json({ message: "Saved a new version" }))
    .catch(err => res.json({ err }));
});

module.exports = router;