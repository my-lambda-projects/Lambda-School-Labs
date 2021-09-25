const db = require("../../data/dbconfig.js");

module.exports = {
  getAllActivities,
  getAllUserActivities,
  getUserActivitiesByUserId,
  getUserActivitiesByActivityId,
  addUserActivity,
  deleteUserActivity,
  getAllActivitiesNotAssociatedWithId
};

function getAllUserActivities() {
  return db("user_activities");
}

/* 
  Gets both the user's created activities and the user's joined activities. returns the name, date, time and description of each activity. 
 */
function getAllActivities(user_id) {
  return db("user_activities as ua")
    .join("activities as a", "ua.activity_id", "a.id")
    .join("users as u", "a.organizer_id", "u.id")
    .where({ user_id })
    .select("a.*", "u.first_name as organizer_name")
    .then(joined => {
      return db("activities as a")
        .where("organizer_id", user_id)
        .join("users as u", "a.organizer_id", "=", "u.id")
        .select("a.*", "u.first_name as organizer_name")
        .then(organizer => {
          return [...joined, ...organizer];
        });
    });
}

function getAllActivitiesNotAssociatedWithId(user_id) {
  return db("user_activities as ua")
    .where("ua.user_id", user_id)
    .join("activities as a", "ua.activity_id", "a.id")
    .join("users as u", "a.organizer_id", "u.id")
    .select("a.*", "u.first_name as organizer_name")
    .then(joined => {
      return db("activities as a")
        .join("users as u", "a.organizer_id", "=", "u.id")
        .select("a.*", "u.first_name as organizer_name")
        .then(activities => {
          const idArray = joined.map(act => act.id);
          const actArray = [...activities];
          for (let i = 0; i < actArray.length; i++) {
            for (let j = 0; j < idArray.length; j++) {
              if (actArray[i].id == idArray[j]) {
                const removed = actArray.splice(i, 1);
              }
            }
          }
          return [...actArray];
        });
    });
}

function getUserActivitiesByUserId(user_id) {
  return db("user_activities")
    .where({ user_id })
    .then(user_activities => user_activities);
}

function getUserActivitiesByActivityId(activity_id) {
  return db("user_activities")
    .where({ activity_id })
    .then(user_activities => user_activities);
}

function addUserActivity(userActivity) {
  let user_id = userActivity.user_id;
  let activity_id = userActivity.activity_id;

  return db("user_activities")
    .insert(userActivity)
    .then(result => {
      return result; // returns an id
      //     --- Not sure what data to return at the moment ---
      // return (
      //   db("user_activities as ua")
      //     .join("users as u", "ua.user_id", "u.id")
      //     .join("activities as a", "ua.activity_id", "a.id")
      //     .select("u.first_name", "a.id", "a.name")
      //     .where({ user_id, activity_id })
      //     .first()
      // );
    });
}

function deleteUserActivity(user_id, activity_id) {
  return db("user_activities")
    .del()
    .where({ user_id, activity_id })
    .then(result => result);
}
