const express = require("express");
const router = express.Router();
const knex = require("knex");
const dbConfig = require("../knexfile");
const db = require("../config.js");

//Create
//create a new comment
//-------------------------------------------
router.post("", (req, res) => {
  const { content, date, posted_by, posters_email, posters_pic, pic_url, event_id } = req.body;

  //add comment to database
  db.insert({ content, date, posted_by, posters_email, posters_pic, pic_url, event_id })
    .into("comments")
    .then(res1 => {
      //see the current comment count for event
      db("events")
        .where({ id: event_id })
        .first()
        .then(res2 => {
          //take current comment count and add 1 to it
          let num = res2.total_comments;
          num = num + 1;

          db("events")
            .where({ id: event_id })
            .update({ total_comments: num })
            .then(res3 => {
              return res.status(200).json(res3);
            })
            .catch(err3 => {
              //catch for updating event
              console.log(err3);
              return res.status(500).json(err3);
            });
        })
        .catch(err2 => {
          //catch for looking up event
          console.log(err2);
          return res.status(500).json(err2);
        });
    })
    .catch(err1 => {
      //catch for inserting comment
      console.log(err1);
      res.status(500).json(err1);
    });
});

// Put
// update a comment
// -------------------------------------------
router.put("", (req, res) => {
  const changes = req.body;
  db("comments")
    .where({
      id: changes.id,
      event_id: changes.event_id,
      posted_by: changes.posted_by
    })
    .update({
      content: changes.content
    })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete
// delete a comment
// -------------------------------------------
router.delete("", (req, res) => {
  const { comment_id, event_id } = req.body;

  //first we delete the comment
  db("comments")
    .where({ id: comment_id })
    .del()
    .then(() => {
      //then we look up the event that it relates to to see its comment count
      db("events")
        .where({ id: event_id })
        .first()
        .then(resp1 => {
          let num = resp1.total_comments;
          num = num - 1;
          //then we decrement that comment count by one
          db("events")
            .where({ id: event_id })
            .update({ total_comments: num })
            .then(resp2 => {
              return res.status(200).json(resp2);
            })
            .catch(err3 => {
              //catch for error on decrementing comment count on event
              console.log(err3);
              res.status(500).json(err3);
            });
        })
        .catch(err2 => {
          //catch for error on looking up event
          console.log(err2);
          res.status(500).json(err2);
        });
    })
    .catch(err1 => {
      //catch for error on deleting comment
      console.log(err1);
      res.status(500).json(err1);
    });
});

module.exports = router;
