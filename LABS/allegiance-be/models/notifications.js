const db = require("../data/db-config");

const Posts = require("../models/posts");
const Replies = require("../models/replies");
const Groups = require("../models/groups");

module.exports = {
  findByUserId,
  addToUser,
  remove,
  find,
};

async function findByUserId(user_id) {
  const results = await db("notifications as n")
    .join("users as u", "u.id", "n.invoker_id")
    .where({ user_id })
    .select(
      "n.user_id",
      "n.invoker_id",
      "n.type_id",
      "n.type",
      "n.read",
      "n.created_at",
      "u.username",
      "u.first_name",
      "u.last_name",
      "u.image",
      "n.id"
    );

  return results.reduce(async (prev, note) => {
    try {
      const acc = await prev;
      if (note.type === "reply_like") {
        const reply = await Replies.find({ "r.id": note.type_id }).first();
        if (reply) {
          acc.push({
            ...note,
            content: reply.reply_content,
            post_id: reply.post_id,
          });
        } else {
          await remove(note.id);
        }
      } else if (note.type === "like" || note.type === "reply") {
        const post = await Posts.find({ "p.id": note.type_id }).first();
        if (post) {
          acc.push({
            ...note,
            content: post.post_content,
          });
        } else {
          await remove(note.id);
        }
      } else if (
        note.type === "group_request" ||
        note.type === "group_accepted"
      ) {
        const group = await Groups.find({ id: note.type_id }).first();
        if (group) {
          acc.push({
            ...note,
            content: group.group_name,
          });
        } else {
          await remove(note.id);
        }
      }
      return acc;
    } catch (err) {
      console.log(err);
    }
  }, Promise.resolve([]));
}

async function addToUser(user_id, invoker_id, type_id, type) {
  const [note] = await db("notifications")
    .insert({
      user_id,
      invoker_id,
      type_id,
      type,
    })
    .returning("*");

  let newNote;
  try {
    if (note.type === "reply_like") {
      const reply = await Replies.find({ "r.id": note.type_id }).first();
      if (reply) {
        newNote = {
          ...note,
          content: reply.reply_content,
          post_id: reply.post_id,
        };
      }
    } else if (note.type === "like" || note.type === "reply") {
      const post = await Posts.find({ "p.id": note.type_id }).first();
      if (post) {
        newNote = {
          ...note,
          content: post.post_content,
        };
      }
    } else if (
      note.type === "group_request" ||
      note.type === "group_accepted"
    ) {
      const group = await Groups.find({ id: note.type_id }).first();
      if (group) {
        newNote = {
          ...note,
          content: group.group_name,
        };
      }
    }
  } catch (err) {
    console.log(err);
  }
  return newNote;
}

function find(id) {
  return db("notifications")
    .where({ id })
    .first();
}

function remove(id) {
  return db("notifications")
    .where({ id })
    .del()
    .returning("*");
}
