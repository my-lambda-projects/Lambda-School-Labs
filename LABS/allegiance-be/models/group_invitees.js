const db = require("../data/db-config");

module.exports = {
  findByUserId,
  findByGroupId,
  addInvitation,
  deleteInvitation,
  findByUserAndGroup
};

function findByUserAndGroup(user_id, group_id) {
  return db("group_invitees").where({ user_id, group_id }).first();
}

function findByUserId(user_id) {
  return db("group_invitees as i")
    .where({ user_id })
    .join("users as u", "u.id", "i.sender_id")
    .join("groups as g", "g.id", "i.group_id")
    .select(
      "i.user_id",
      "i.sender_id",
      "i.group_id",
      "i.created_at",
      "g.group_name",
      "g.image",
      "u.first_name",
      "u.last_name"
    );
}

function findByGroupId(group_id) {
  return db("group_invitees as g")
    .where({ group_id })
    .join("users as u", "u.id", "g.user_id")
    .select("u.email", "u.username");
}

function addInvitation(group_id, user_id, sender_id) {
  return db("group_invitees")
    .insert({ group_id, user_id, sender_id })
    .returning("*");
}

function deleteInvitation(group_id, user_id, sender_id) {
  return db("group_invitees")
    .where({ group_id, user_id, sender_id })
    .del()
    .returning("*");
}
