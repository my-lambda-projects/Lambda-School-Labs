const moment = require("moment");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("scheduledEvent")
    .truncate()
    .then(function() {
      // Inserts seed entries
      // let date1 = moment("2019-02-01 13:00").format("YYYYMMDD, h:mm a");
      // let date2 = moment("2019-02-02 15:00").format("YYYYMMDD, h:mm a");
      // let date3 = moment("2019-02-17 20:00").format("YYYYMMDD, h:mm a");
      // console.log(moment("2019-02-01 13:00").add(3,'days').format("YYYYMMDD, h:mm a"))

      return knex("scheduledEvent").insert([
        {
          scheduledEvent_name: "Game: Tigers vs. Penguins",
          eventStart: moment("2019-02-01 13:00").format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(3,'h').format("YYYYMMDD, h:mm a"),
          eventTypeID: 1,
          locationID: 1,
          familyID: 1,
          createdBy:1
        },
        {
          scheduledEvent_name: "Olympics Rehersal",
          eventStart: moment("2019-02-01 13:00").add(3,'d').format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(3,'d').add(2,'h').format("YYYYMMDD, h:mm a"),
          eventTypeID: 2,
          locationID: 2,
          familyID: 2,
          createdBy:5
        },
        {
          scheduledEvent_name: "Game: Tigers vs. Dingers",
          eventStart: moment("2019-02-01 13:00").add(2,'d').format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(2,'d').add(3, "h").format("YYYYMMDD, h:mm a"),
          eventTypeID: 1,
          locationID: 1,
          familyID: 1,
          createdBy:1
        },
        {
          scheduledEvent_name: "Game: Tigers vs. Floppers",
          eventStart: moment("2019-02-01 13:00").add(5,'d').add(3, "h").format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(5,'d').add(6, "h").format("YYYYMMDD, h:mm a"),
          eventTypeID: 1,
          locationID: 1,
          familyID: 1,
          createdBy:2
        },
        {
          scheduledEvent_name: "Kickflip Contest",
          eventStart: moment("2019-02-01 13:00").add(12,'d').add(3, "h").format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(12,'d').add(7, "h").format("YYYYMMDD, h:mm a"),
          eventTypeID: 3,
          locationID: 3,
          familyID: 1,
          pendingApproval:true,
          createdBy:4
        },
        {
          scheduledEvent_name: "Game: Tigers vs. Wingnuts",
          eventStart: moment("2019-02-01 13:00").add(22,'d').add(3, "h").format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(22,'d').add(6, "h").format("YYYYMMDD, h:mm a"),
          eventTypeID: 1,
          locationID: 1,
          familyID: 1,
          approved:true,
          createdBy:3
        },
        {
          scheduledEvent_name: "Kickflip Contest",
          eventStart: moment("2019-02-01 13:00").add(23,'d').add(3, "h").format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(23,'d').add(8, "h").format("YYYYMMDD, h:mm a"),
          eventTypeID: 3,
          locationID: 3,
          familyID: 1,
          pendingApproval:true,
          createdBy:4
        },
        {
          scheduledEvent_name: "Kickflip Contest",
          eventStart: moment("2019-02-01 13:00").add(1,'d').add(3, "h").format("YYYYMMDD, h:mm a"),
          eventEnd: moment("2019-02-01 13:00").add(1,'d').add(8, "h").format("YYYYMMDD, h:mm a"),
          eventTypeID: 3,
          locationID: 3,
          familyID: 1,
          declined:true,
          createdBy:4
        }
      ]);
    });
};
