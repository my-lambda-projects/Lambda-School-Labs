const express = require('express')

const Users = require('../models/users')
const Posts = require('../models/posts')
const PostsLikes = require('../models/posts_likes')

const router = express.Router()

const validation = require('../middleware/dataValidation')

const { postLikeSchema } = require('../schemas')

router
  .route('/post/:post_id')
  .get(async (req, res) => {
    const { post_id } = req.params
    // Find all likes for a specific post
    const postLikes = await PostsLikes.find({ post_id })
    if (postLikes.length !== 0) {
      res.status(200).json({ postLikes })
    } else {
      res.status(404).json({
        message: 'That post does not exist or does not have any likes',
      })
    }
  })
  .post(validation(postLikeSchema), async (req, res) => {
    const { post_id } = req.params
    const { user_id } = req.body
    // Check that user provided exists
    const user = await Users.find({
      id: user_id,
    }).first()
    // Check that post provided exists
    const post = await Posts.find({
      'p.id': post_id,
    }).first()
    if (user && post) {
      // If both user and post exists, create new association
      const newLike = { post_id, user_id }
      const likeResult = await PostsLikes.add(newLike)
      res.status(201).json({
        likeResult,
      })
    } else {
      res.status(404).json({
        message: 'User and/or Post provided does not exist',
      })
    }
  })

// Endpoint for searching likes of multiple posts
router.route('/post_search').post(async (req, res) => {
  const { post_id } = req.body
  if (post_id) {
    const postsLikes = await PostsLikes.find({ post_id })
    if (postsLikes.length !== 0) {
      res.status(200).json({ postsLikes })
    } else {
      res.status(404).json({
        message: 'Post(s) provided do(es) not exist or have no likes',
      })
    }
  } else {
    res.status(400).json({
      message: 'Please include post_id(s) in the body of the request',
    })
  }
})

router.route('/user/:user_id').get(async (req, res) => {
  const { user_id } = req.params
  // Find all likes for a specific user
  const postsLikes = await PostsLikes.find({ user_id })
  if (postsLikes.length !== 0) {
    res.status(200).json({ postsLikes })
  } else {
    res.status(404).json({
      message: 'That user does not exist or has not liked any posts',
    })
  }
})

router
  .route('/:id')
  .delete(async (req, res) => {
    const { id } = req.params
    const deleted = await PostsLikes.remove({ id })
    if (deleted) {
      res.status(200).json({
        deleted,
      })
    } else {
      res
        .status(404)
        .json({ message: 'That post-like association does not exist.' })
    }
  })
  .get(async (req, res) => {
    const { id } = req.params
    const postLike = await PostsLikes.find({ 'p_l.id': id }).first()
    if (postLike && postLike.id) {
      res.status(200).json({
        postLike,
      })
    } else {
      res
        .status(404)
        .json({ message: 'That post-like association does not exist.' })
    }
  })

module.exports = router
