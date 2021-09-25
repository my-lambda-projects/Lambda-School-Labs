const express = require("express");

const Users = require("../models/users");
const Groups = require("../models/groups");
const Posts = require("../models/posts");
const PostsLikes = require("../models/posts_likes");
const Replies = require("../models/replies");
const RepliesLikes = require("../models/replies_likes");

const router = express.Router();

const validation = require("../middleware/dataValidation");

const { postSchema } = require("../schemas");

// Reusable function to add likes and replies as arrays to a post response
async function addLikesAndRepliesToPost(posts, error, res) {
  if (posts.length !== 0) {
    // Obtain list of post ids for likes and replies lookup
    const postIds = posts.map(post => post.id);
    // Obtain array of all likes from post IDs specified
    const allLikes = await PostsLikes.find({ post_id: postIds });
    // Obtain array of all replies from post IDs specified
    const allReplies = await Replies.find({ post_id: postIds });
    // Initiate repliesWithLikes and check if all replies contains entries
    let repliesWithLikes = [];
    if (allReplies.length !== 0) {
      // Obtain list of reply ids for reply likes lookup
      const replyIds = allReplies.map(reply => reply.id);
      // Obtain array of all reply likes from reply IDs specified
      const repliesLikes = await RepliesLikes.find({ reply_id: replyIds });
      // Map in likes to the proper reply ids
      repliesWithLikes = allReplies.map(reply => {
        return {
          ...reply,
          replyLikes: repliesLikes.filter(
            replyLike => replyLike.reply_id === reply.id
          ),
        };
      });
    }
    // Map in likes and replies to the proper post ids
    const postsLoaded = posts.map(post => {
      return {
        ...post,
        likes: allLikes.filter(like => like.post_id === post.id),
        replies: repliesWithLikes.filter(reply => reply.post_id === post.id),
      };
    });
    // Return post with likes and replies (along with reply likes) included
    res.status(200).json({ postsLoaded });
  } else {
    res.status(404).json({
      message: `That/those ${error} does not exist or does not have any posts`,
    });
  }
}

router
  .route("/group/:group_id")
  .get(async (req, res) => {
    const { group_id } = req.params;
    const posts = await Posts.find({ group_id });
    addLikesAndRepliesToPost(posts, "group", res);
  })
  .post(validation(postSchema), async (req, res) => {
    const { group_id } = req.params;
    const { user_id, post_content } = req.body;
    // Check that user provided exists
    const user = await Users.find({
      id: user_id,
    }).first();
    // Check that group provided exists
    const group = await Groups.find({
      id: group_id,
    }).first();
    if (user && group) {
      const newPost = { group_id, user_id, post_content };
      const postResult = await Posts.add(newPost);
      postResult["likes"] = [];
      postResult["replies"] = [];
      res.status(201).json({
        postResult,
      });
    } else {
      res.status(404).json({
        message: "User and/or Group provided does not exist",
      });
    }
  });

router.route("/group_search").post(async (req, res) => {
  const { group_id } = req.body;
  if (group_id) {
    const posts = await Posts.find({ group_id });
    addLikesAndRepliesToPost(posts, "group(s)", res);
  } else {
    res.status(400).json({
      message: "Please include group_id(s) in the body of the request",
    });
  }
});

router.route("/user/:user_id").get(async (req, res) => {
  const { user_id } = req.params;
  const posts = await Posts.find({ user_id });
  addLikesAndRepliesToPost(posts, "user", res);
});

router
  .route("/:id")
  .delete(async (req, res) => {
    const { id } = req.params;

    const deleted = await Posts.remove({ id });

    if (deleted) {
      res.status(200).json({ ...deleted[0] });
    } else {
      res.status(404).json({ message: "That post does not exist." });
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    const post = await Posts.find({ "p.id": id }).first();
    if (post && post.id) {
      // Find likes for the post
      const likes = await PostsLikes.find({ post_id: id });
      // Find replies for the post
      const repliesNoLikes = await Replies.find({ post_id: id });
      // Obtain list of reply ids for reply likes lookup
      const replyIds = repliesNoLikes.map(reply => reply.id);
      // Obtain array of all reply likes from reply IDs specified
      const repliesLikes = await RepliesLikes.find({ reply_id: replyIds });
      // Map in likes to the proper reply ids
      const replies = repliesNoLikes.map(reply => {
        return {
          ...reply,
          replyLikes: repliesLikes.filter(
            replyLike => replyLike.reply_id === reply.id
          ),
        };
      });
      // Add likes and replies in as arrays to the post object
      const postLoaded = { ...post, likes, replies };
      res.status(200).json({
        postLoaded,
      });
    } else {
      res.status(404).json({ message: "That post does not exist." });
    }
  });

module.exports = router;
