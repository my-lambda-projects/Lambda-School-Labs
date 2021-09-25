const Photo = require('./model');

const r = require('../helpers/responses');

exports.updateTags = (req, res, next) => {
	const tags = req.body.tags.map(t => ({ id: t, text: t }));

	Photo.findByIdAndUpdate(
		req.params.id,
		{ tags },
		{ new: true },
		(err, updatedPhoto) => {
			if (err) {
				r.error(res, err, `error updating tags of photo`);
				return;
			}

			req.updatedPhoto = updatedPhoto;
			next();
		},
	);
};

exports.getPhotosOf = (req, res, next) => {
	let nickNamesString = '';

	nickNamesString += `[`;

	req.user.nickNames.forEach(n => (nickNamesString += `"${n}", `));

	nickNamesString = nickNamesString.slice(0, nickNamesString.length - 2);
	nickNamesString += `]`;

	Photo.$where(
		`this.tags.map(t => t.text).some(e => ${nickNamesString}.includes(e))`,
	).exec((err, photos) => {
		if (err) {
			r.error(res, err, `error finding photos of you`);
			return;
		}

		req.othermes = photos;
		next();
	});
};

exports.request = (req, res, next) => {
	const parm = req.params.id;
	let query;

	if (!parm) {
		query = Photo.find();
	} else {
		query = Photo.find({ _id: parm });
	}

	query.exec((err, photos) => {
		if (err) {
			r.error(res, err, `error locating picture`);
			return;
		}

		req.photos = photos;
		next();
	});
};

/**
 * add pictures to database
 */
exports.insertMany = (req, res, next) => {
	const uploadedImages = req.files.map((i, idx) => {
		let newImage = {};
		newImage.tags = JSON.parse(req.body.tags);
		newImage.url = i.transforms[0].location;
		newImage.owner = req.user.id;
		return newImage;
	});

	Photo.insertMany(uploadedImages, (err, docs) => {
		if (err) {
			r.error(res, err, 'failed to save images');
			return;
		}

		const pictureIds = [];
		docs.forEach(image => pictureIds.push(image._id));

		req.pictureIds = pictureIds;
		next();
	});
};
