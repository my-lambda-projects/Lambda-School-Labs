const express = require("express");
const server = express();

const knex = require("knex");

const dbEngine = process.env.DB || "development";
const dbConfig = require("../knexfile")[dbEngine];
const db = knex(dbConfig);

const getState = require("./stateCalls");
const paymentApi = require("./stripe");
const middleware = require("./middleware");
const routeMaker = require("./routeMaker");
const cron = require("./scheduler");

middleware(server);
const client = require("twilio")(
  process.env.TWILO_ACCOUNT_SID,
  process.env.TWILO_AUTH_TOKEN
);

// To activate text notifications, sign up for Twilio account and put in account phone number below.
// cron(); <-----Uncomment to activate scheduler for text notifications
// ========= TWILIO =========//

server.post("/text", (req, res) => {
  console.log("RUNNING TWILIO")
  const { phone, title, start, body } = req.body;
  client.messages
    .create({
      body: `Reminder that you have a ${title} starting on ${start}.`,
      from: "+18338536427",
      to: `+1${phone}`
    })
    .then(message => console.log(message.sid))
    .done();
});

// ========= SERVER =========//

server.get("/", (req, res) => {
  res.send("Family Tabs Api");
});

server.get("/scheduledEventNameWithUsers", async (req, res) => {
  try {
    const events = await db("scheduledEvent")
      .join("eventWithUsers", "scheduledEvent.id", "=", "eventWithUsers.scheduledEventID")
      .join("user", "eventWithUsers.userID", "=", "user.id")
      .select(
        "scheduledEvent.scheduledEvent_name",
        "scheduledEvent.eventStart",
        "scheduledEvent.eventEnd",
        "scheduledEvent.dayAlert",
        "user.phone",
        "user.textCheckbox"
      )
    return res.status(200).json(events);
  } catch (err) {console.log("ERROR", err)
    res.json({ err });
  }
});


server.use('/event', routeMaker('scheduledEvent', ['scheduledEvent_name', 'eventStart', 'eventEnd', 'familyID', 'eventTypeID', 'locationID'],db, 'scheduled event'))
server.use('/profile', routeMaker('user',['phone', 'familyID', 'userName', 'email'],db, 'profile' ))
server.use('/family', routeMaker('family', ['family_name'], db, 'family'))
server.use('/location', routeMaker('location', ['location_name', 'familyID'], db, 'location'))
server.use('/eventtype', routeMaker('eventType', ['eventType_name', 'familyID' ], db, 'event type'))
server.use('/eventwithusers', routeMaker('eventWithUsers', ['scheduledEventID', 'userID', 'familyID'],db,'events with users'))

getState(server, db);
paymentApi(server);

module.exports = server;
