const router = require('express').Router();

const { debug } = require('../../../../dev');

/**
 * controller that interacts with the photos table in database
 */
const photoCTR = require('../../../photos/controller');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');
const sanitize = require('../../../helpers/sanitize');
const validate = require('../../../helpers/validate');

/**
 * /api/pictures/othermes
 *
 * - GET: retrieves pictures of user uploaded by other users
 */
router
	.route('/')

	/**
	 * GET /api/pictures/othermes
	 *
	 * retrieves pictures of user uploaded by other users, then
	 * filter photos to make sure they are not in user's collection already
	 *
	 * req.othermes is from photoCTR.getPhotosOf (all unfiltered photos of user)
	 * req.photos is from userCTR.photos (the user's already claimed photos)
	 *
	 * note: use `JSON.stringify` to check picture `ObjectId`s
	 */
	.get(authenticate.sid, photoCTR.getPhotosOf, userCTR.photos, (req, res) => {
		const collectionPhotosIds = req.photos.map(p => JSON.stringify(p._id));

		const filteredPhotos = req.othermes.filter(
			photo => !collectionPhotosIds.includes(JSON.stringify(photo._id)),
		);

		r.send(res, 200, sanitize.pictures(filteredPhotos));
	});

/**
 * /api/pictures/othermes/:id
 *
 * - POST: claim a picture
 */
router
	.route('/:id')

	/**
	 * make sure user has credits, then
	 * retrieve picture, then
	 * add photo ref to user's photo
	 * if successful, add credits to original user
	 */
	.post(
		authenticate.sid,
		validate.credits,
		photoCTR.request,
		userCTR.addPhotoToCollection,
		userCTR.creditPhotoOwner,
		(req, res) => {
			r.send(res, 200, sanitize.response(req.updatedUser));
		},
	);

module.exports = router;
