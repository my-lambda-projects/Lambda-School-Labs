const db = require("../../data/dbconfig");

module.exports = {
  getInterests,
  getInterestById,
  getUserInterests,
  addUserInterest,
  deleteUserInterest
};

function getInterests() {
  return db("interests");
}

function getInterestById(id) {
  return db("interests")
    .where({ id })
    .first();
}

// user interests

function getUserInterests(user_id) {
  return db("user_interests")
    .where({ user_id })
    .then(user_interests => user_interests);
}

function addUserInterest(userInterest) {
  let user_id = userInterest.user_id;
  let interests_id = userInterest.interests_id;

  return db("user_interests")
    .insert(userInterest)
    .then(result => {
      return db("user_interests as ui")
        .join("users as u", "ui.user_id", "u.id")
        .join("interests as i", "ui.interests_id", "i.id")
        .select("u.first_name", "i.name")
        .where({ user_id: user_id, interests_id: interests_id })
        .first();
    });
}

function deleteUserInterest(user_id, interest_id) {
  return db("user_interests")
    .del()
    .where({ user_id: user_id, interests_id: interest_id })
    .then(result => result);
}
