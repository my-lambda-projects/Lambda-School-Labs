const User = require('./model');
const Photo = require('../photos/model');

const r = require('../helpers/responses');

exports.user = User;

exports.save = (req, res, next) => {
	req.saveThisUser.save((err, savedUser) => {
		if (err) {
			r.error(res, err, `error updating user settings`);
			return;
		}

		req.savedUser = savedUser;
		next();
	});
};

exports.create = (req, res, next) => {
	const user = new User(req.newUser);

	user.save((err, savedUser) => {
		if (err) {
			r.error(res, err, `server failed to save new user`);
			return;
		}

		req.savedUser = savedUser;
		next();
	});
};

exports.request = function(parm) {
	if (!parm) return User.find();
	return User.findOne(parm);
};

exports.retrieve = (req, res, next) => {
	User.find({}, (err, docs) => {
		if (err) {
			r.error(res, err, `error retrieving user`);
			return;
		}

		req.foundUsers = docs;
		next();
	});
};

exports.update = (req, res, next) => {
	User.findByIdAndUpdate(req.user.id, req.parm, { new: true }, (err, doc) => {
		if (err) {
			r.error(res, err, `error updating user`);
			return;
		}

		req.updatedUser = doc;
		next();
	});
};

exports.requestById = (req, res, next) => {
	User.findById(req.user.id, (err, user) => {
		if (err) {
			r.error(res, err, `error finding user by id`);
			return;
		}

		req.requestedUser = user;
		next();
	});
};

exports.delete = (req, res, next) => {
	User.findByIdAndRemove({ _id: req.user.id }, err => {
		if (err) {
			r.error(res, err, `server failed to delete user`);
			return;
		}

		next();
	});
};

exports.uploads = (req, res, next) => {
	User.findById(req.user.id, 'uploads')
		.populate('uploads')
		.exec((err, user) => {
			if (err) {
				r.error(res, err, `failed to find user for uploads`);
				return;
			}

			req.userUploads = user.uploads;
			next();
		});
};

/**
 * in callback, docs is an object:
 * { _id: << _id used to search by >>, photos; [array of picture refs] }
 */
exports.photos = (req, res, next) => {
	User.findById(req.user.id, 'photos')
		.populate('photos')
		.exec((err, docs) => {
			if (err) {
				r.error(res, err, `error retrieving user photos`);
				return;
			}

			req.photos = docs.photos;
			next();
		});
};

exports.list = function(req, res, next) {
	User.find()
		.sort([['lastName', 'ascending']])
		.exec(
			(error, listUsers) =>
				error
					? next(error)
					: res.render('user_list', { title: 'User List', list: listUsers }),
		);
};

/**
 * req.requestedUser is from userCTR.requestById
 * req.params.id is the photo id from the front-end
 */
exports.photoUploadDelete = (req, res, next) => {
	const user = req.requestedUser;

	user.uploads = user.uploads.filter(i => i._id != req.params.id);

	User.findByIdAndUpdate(user.id, user, { new: true }, (err, updatedUser) => {
		if (err) {
			r.error(res, err, `server failed to delete photo from uploads`);
			return;
		}

		req.updatedUser = updatedUser;
		next();
	});
};

/**
 * req.requestedUser is from userCTR.requestById
 * req.params.id is the photo id from the front-end
 */
exports.userPhotoDelete = (req, res, next) => {
	const user = req.requestedUser;

	user.photos = user.photos.filter(i => i._id != req.params.id);

	User.findByIdAndUpdate(user.id, user, { new: true }, (err, updatedUser) => {
		if (err) {
			r.error(res, err, `server failted to delete photo from collection`);
			return;
		}

		req.updatedUser = updatedUser;
		next();
	});
};

exports.addPhotoToUpload = (req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.user.id },
		{ $push: { uploads: req.pictureIds } },
		{ new: true },
		(err, updatedUser) => {
			if (err) {
				r.error(res, err, `server failed to add uploaded photo to user`);
				return;
			}

			req.updatedUser = updatedUser;
			next();
		},
	);
};

/**
 * since there is only one photo we are adding (for now), and
 * we know that photoCTR.request will return an Array with one element
 * (since we have a parm, or parameter we are passing from the front-end)
 * push the 0th element's _id from req.photos to user's collection
 */
exports.addPhotoToCollection = (req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.user.id },
		{ $push: { photos: req.photos[0]._id }, $inc: { balance: -1 } },
		{ new: true },
		(err, updatedUser) => {
			if (err) {
				r.error(res, err, `error adding photo to collection`);
				return;
			}

			req.updatedUser = updatedUser;
			next();
		},
	);
};

exports.creditPhotoOwner = (req, res, next) => {
	const ownerId = req.photos[0].owner;

	User.findByIdAndUpdate(
		{ _id: ownerId },
		{ $inc: { balance: 1 } },
		{ new: true },
		err => {
			if (err) {
				r.error(res, err, `error crediting owner of photo`);
				return;
			}

			next();
		},
	);
};
