const router = require('express').Router();

/**
 * models
 */
const image = require('../../../photos/model');
const user = require('../../../users/model');

/**
 * photo model helper
 */
const { upload } = require('../../../photos/transform');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * controller that interacts with the photos table in database
 */
const photoCTR = require('../../../photos/controller');

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');
const sanitize = require('../../../helpers/sanitize');

/**
 * /api/pictures/upload
 * - POST: saves photos to photos database
 */
router
	.route('/')

	/**
	 * POST /api/pictures/upload
	 *
	 * saves photos to photos database
	 */
	.post(
		authenticate.sid,
		upload.array('image'),
		photoCTR.insertMany,
		userCTR.addPhotoToUpload,
		(req, res) => {
			r.send(res, 200, sanitize.response(req.updatedUser));
		},
	);

module.exports = router;
