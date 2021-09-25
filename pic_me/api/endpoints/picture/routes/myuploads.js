const router = require('express').Router();

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
const validate = require('../../../helpers/validate');
const sanitize = require('../../../helpers/sanitize');

/**
 * /api/pictures/myuploads
 * - GET: retrieves all uploaded photos for logged in user
 */
router
	.route('/')

	/**
	 * GET /api/pictures/myuploads
	 *
	 * retrieves all uploaded photos for logged in user
	 */
	.get(authenticate.sid, userCTR.uploads, (req, res) => {
		r.send(res, 200, sanitize.pictures(req.userUploads));
	});

/**
 * /api/pictures/myuploads/:id
 * - DELETE: deletes the photo reference to the logged in user's upload
 */
router
	.route('/:id')

	/**
	 * PUT /api/pictures/myupoads/:id
	 *
	 * edits the tags of the uploaded picture
	 *
	 * tags are formatted as:
	 * [{ id: TAG1, text: TAG1 }, { id: TAG2, text: TAG2 }, { ... }]
	 *
	 * because `sanitize.pictures()` expects an Array and returns an Array,
	 * put updatedPhoto into an Array and
	 * just choose the 0-th element in returned Array
	 */
	.put(
		authenticate.sid,
		validate.updatedTags,
		photoCTR.updateTags,
		(req, res) => {
			r.send(res, 200, sanitize.pictures([req.updatedPhoto])[0]);
		},
	)

	/**
	 * DELETE /api/pictures/myuploads/:id
	 *
	 * deletes the photo reference to the logged in user's upload
	 *
	 * note: this does NOT delete the photo from the photos database
	 *       deleting actual photos is NOT allowed right now
	 *       there should be a disclaimed when uploading photos about this
	 */
	.delete(
		authenticate.sid,
		userCTR.requestById,
		userCTR.photoUploadDelete,
		(req, res) => {
			r.send(res, 200, sanitize.response(req.updatedUser));
		},
	);

module.exports = router;
