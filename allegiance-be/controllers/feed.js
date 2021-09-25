const express = require("express");

const Feeds = require("../models/feeds");
const PostsLikes = require('../models/posts_likes')
const Replies = require('../models/replies')

const router = express.Router();

router.route("/").post(async (req, res) => {
	const { group_id, interval } = req.body;
	if (group_id && interval) {
		const filters = { group_id, interval };
		// Obtain posts from stated interval
		const posts = await Feeds.findPosts(filters);
		const mappedPosts = posts.map(async (post) => {
			const likes = await PostsLikes.find({ post_id: post.id })
			const replies = await Replies.find({ post_id: post.id })
			return {
				...post,
				likes,
				replies,
			}
		})
		// Map to add identifying tag
		// const posts = postsResponse.map(post => {
		// 	return { ...post, tag: "post" };
		// });
		// // Obtain replies from stated interval
		// const repliesResponse = await Feeds.findReplies(filters);
		// // Map to add identifying tag
		// const replies = repliesResponse.map(reply => {
		// 	return { ...reply, tag: "reply" };
		// });
		// // Obtain post likes from stated interval
		// const postLikesSeparateNames = await Feeds.findPostLikes(filters);
		// // Map post likes to combine first and last name for posters and likers
		// const postLikes = postLikesSeparateNames.map(p_l => {
		// 	// Destructure to remove first/last names from callback
		// 	const {
		// 		liker_first_name,
		// 		liker_last_name,
		// 		poster_first_name,
		// 		poster_last_name,
		// 		...rest
		// 	} = p_l;
		// 	return {
		// 		// Return remainder of callback object, the combined names for posters and likers, and an identifying tag
		// 		...rest,
		// 		liker_name: `${p_l.liker_first_name} ${p_l.liker_last_name}`,
		// 		poster_name: `${p_l.poster_first_name} ${p_l.poster_last_name}`,
		// 		tag: "postLike"
		// 	};
		// });
		// // Obtain reply likes from stated interval
		// const replyLikesSeparateNames = await Feeds.findReplyLikes(filters);
		// // Map reply likes to combine first and last name for repliers and likers
		// const replyLikes = replyLikesSeparateNames.map(r_l => {
		// 	// Destructure to remove first/last names from callback
		// 	const {
		// 		liker_first_name,
		// 		liker_last_name,
		// 		replier_first_name,
		// 		replier_last_name,
		// 		...rest
		// 	} = r_l;
		// 	return {
		// 		// Return remainder of callback object, the combined names for repliers and likers, and an identifying tag
		// 		...rest,
		// 		liker_name: `${r_l.liker_first_name} ${r_l.liker_last_name}`,
		// 		replier_name: `${r_l.replier_first_name} ${r_l.replier_last_name}`,
		// 		tag: "replyLike"
		// 	};
		// });

		// // Sort arrays with most recent first (left for future use, not needed if sending combined array)
		// posts.sort((a, b) => b.created_at - a.created_at);
		// replies.sort((a, b) => b.created_at - a.created_at);
		// postLikes.sort((a, b) => b.created_at - a.created_at);
		// replyLikes.sort((a, b) => b.created_at - a.created_at);

		// // Combine arrays and sort
		// const allActivity = [...posts, ...replies, ...postLikes, ...replyLikes];
		// allActivity.sort((a, b) => b.created_at - a.created_at);

		// Return combined array
		Promise.all(mappedPosts).then(posts => {
			posts.sort((a, b) => b.created_at - a.created_at);
			console.log('posts', posts);
			res.status(200).json(posts);
		}).catch(err => {
			res.status(500).json({ err: 'Unknown server error.' });
		})
	} else {
		res.status(400).json({
			message: "Please enter group_id and interval in the body of the request"
		});
	}
});

module.exports = router;
