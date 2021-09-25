require("dotenv").config();
const axios = require("axios");
const _ = require("lodash");
const router = require("express").Router();

// import oauth
// need?
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Fetch user commits
// async function fetchGithubData() {
//   let authStr = "Bearer " + process.env.GITHUB_AUTH_TOKEN; // Add token
//
//   return await axios
//     .get(`https://api.github.com/users/abrambueno1992/events/public`, {
//       // Add user github handle
//       headers: {
//         Authorization: authStr
//       }
//     })
//     .then(res => {
//       const data = res.data;
//
//       // return _.chain(data)
//          const distinctSize  = _.map(data, _.property('payload.distinct_size'));
//          const size = _.map(data, _.property('payload.size'));
//          const created_at = _.map(data, _.property('created_at'));
//          return ({'size': size, 'distinct size': distinctSize, 'created': created_at});
//
//     })
//     .catch(err => console.log(err));
// }

// Int storage var
let storage;

// Fetch Github data every 5s
// setInterval(async () => {
//   console.log("Fetching github data");
//   storage = await fetchGithubData();
//   console.log("Finished");
//   console.log(storage)
// }, 1000);

// @route   GET api/data
// @desc    Gets user commits
// @access  Public (for now)
router.get("/", async (req, res) => {

  // res.send(storage);
});

module.exports = router;
