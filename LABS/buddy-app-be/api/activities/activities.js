const db = require("../../data/dbconfig");

module.exports = {
  getActivities,
  getActivityById,
  getActivitiesByInterests,
  getActivitiesByOrganizer,
  addActivity,
  updateActivity,
  deleteActivity
};

function getActivities() {
  return db("activities as a")
    .join("users as u", "a.organizer_id", "=", "u.id")
    .select(
      "a.id",
      "a.name",
      "a.notes",
      "a.date",
      "a.time",
      "a.guest_limit",
      "a.organizer_id",
      "a.interest_id",
      "a.location",
      "u.first_name as organizer_name"
    );
}

function getActivityById(id) {
  return db("activities as a")
    .where({ id })
    .first();
}

function getActivitiesByInterests(interest_id) {
  return db("activities as a")
    .where({ interest_id })
    .join("users as u", "a.organizer_id", "=", "u.id")
    .select(
      "a.id",
      "a.name",
      "a.notes",
      "a.date",
      "a.time",
      "a.guest_limit",
      "a.organizer_id",
      "a.interest_id",
      "a.location",
      "u.first_name as organizer_name"
    );
}

function getActivitiesByOrganizer(organizer_id) {
  return db("activities as a")
    .where({ organizer_id })
    .join("users as u", "a.organizer_id", "=", "u.id")
    .select(
      "a.id",
      "a.name",
      "a.notes",
      "a.date",
      "a.time",
      "a.guest_limit",
      "a.organizer_id",
      "a.interest_id",
      "a.location",
      "u.first_name as organizer_name"
    );
}

function addActivity(activity) {
  return db("activities")
    .insert(activity, "id")
    .then(([id]) => {
      return getActivityById(id).then(newActivity => newActivity);
    });
}

function updateActivity(id, activity) {
  return db("activities")
    .where({ id })
    .update(activity)
    .then(res => {
      return getActivityById(id).then(newActivity => newActivity);
    });
}

function deleteActivity(id) {
  return db("activities")
    .where({ id })
    .del();
}
