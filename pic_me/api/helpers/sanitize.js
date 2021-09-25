exports.user = (req, res, next) => {
	req.newUser = {
		email: req.body.email,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		nickNames: req.body.nickNames,
	};

	next();
};

exports.update = (req, res, next) => {
	req.parm = {};

	Object.keys(req.body.user).forEach(
		field => (req.parm[field] = req.body.user[field]),
	);

	next();
};

exports.settingsData = (req, res, next) => {
	const { email, password } = req.body.user;
	req.settings = {};

	if (email) req.settings.email = email;
	if (password) req.settings.password = password;

	next();
};

exports.response = user => {
	return {
		...user._doc,
		password: undefined,
		__v: undefined,
		_id: undefined,
		createdAt: undefined,
		updatedAt: undefined,
	};
};

exports.pictures = pictures => {
	return pictures.map(picture => {
		const sanitizedPicture = {};

		sanitizedPicture.id = picture._id;
		sanitizedPicture.url = picture.url;
		sanitizedPicture.tags = picture.tags;

		return sanitizedPicture;
	});
};
