const db = require("../data/dbconfig");

const populateUser = async (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({ err: "No user logged in." });
  }

  try {
    // Look up user in db using email address from session
    const emailaddress = req.user.emails[0].value;
    const users = await db("users").where({ emailaddress });
    req.user = users[0];

    // Look up the latest subscription for the user
    const subscription = await db("subscriptions")
      .where({ user_id: req.user.id })
      .orderBy("date_created", "desc")
      .first();
    if (subscription) {
      const subscriptionDetails = isSubscriptionActive(subscription);
      if (subscriptionDetails[0]) {
        req.user.subscribed = subscriptionDetails[0];
        req.user.subscriptionEnd = subscriptionDetails[1];
      }
    }
    if (req.body.reqType === "send") {
      if (req.user.subscribed) {
        req.body.username = req.user.username;
      } else {
        throw "Request failed with status code 429";
      }
    }
    if (req.body.reqType === "analyze") {
      if (req.user.subscribed) {
        next();
      } else {
        let verified;
        if (
          req.user.currentCycleStart === null &&
          req.user.analysesCount === null
        ) {
          verified = await db("users")
            .where({ id: req.user.id })
            .update({ analysesCount: 1, currentCycleStart: Date.now() });
        } else {
          const now = Date.now();
          const month = 2592000000;
          const currentCycleEnd = parseInt(req.user.currentCycleStart) + month;
          if (now >= currentCycleEnd) {
            verified = await db("users")
              .where({ id: req.user.id })
              .update({ analysesCount: 1, currentCycleStart: now });
          } else {
            if (req.user.analysesCount < 100) {
              verified = await db("users")
                .where({ id: req.user.id })
                .update({ analysesCount: req.user.analysesCount + 1 });
            }
          }
        }
        if (verified === 1) {
          next();
        } else {
          throw "Request failed with status code 429";
        }
      }
    } else {
      next();
    }
  } catch (err) {
    if (err == "Request failed with status code 429") {
      res.status(429).json(err);
    } else {
      res.status(500).json(err);
    }
  }
};

const isSubscriptionActive = subscription => {
  // Force moment to treat datestring from the database as UTC
  // TODO: fix this in the knex configuration
  const start = parseInt(subscription.date_created);
  // Check to see if user is within the subscription window
  const end = start + parseInt(subscription.duration);
  const now = Date.now();
  return [now >= start && now <= end, end];
};

module.exports = populateUser;
