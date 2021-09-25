exports.emailPasswordNotProvided = {
	message: `email and password not provided`,
};

exports.emailNotProvided = {
	message: `email not provided`,
};

exports.passwordNotProvided = {
	message: `password not provided`,
};

exports.firstLastNameNotProvided = {
	message: `first and last names not provided`,
};

exports.firstNameNotProvided = {
	message: `first name not provided`,
};

exports.lastNameNotProvided = {
	message: `last name not provided`,
};

exports.nickName = {
	notProvided: {
		message: `no nicknames provided`,
	},
	notAnArray: {
		message: `nickNames not an Array`,
	},
	tooManyProvided: (nickNames, maxNicknames) => {
		return {
			message: `too many nicknames provided (${
				nickNames.length
			} provided, ${maxNicknames} max)`,
		};
	},
	notString: (i, nickName) => {
		return {
			message: `nickname at index ${i} not type string (typeof ${nickName} (nickName) is ${typeof nickName})`,
		};
	},
};

exports.idNotProvided = {
	message: `id not provided`,
};

exports.idMismatch = {
	message: `id to edit does not match logged in user`,
};

exports.userNotProvided = {
	message: `user not provided`,
};

exports.userFieldNoneFound = {
	message: `no editable fields found in user object`,
};

exports.noUserFieldsChanged = {
	message: `no changed user fields found`,
};

exports.noCredits = {
	message: `no credits`,
};

exports.tags = {
	notAnArray: {
		message: `tags must be an Array`,
	},
	emptyArray: {
		message: `tags cannot be empty`,
	},
	tagsNotAllStrings: {
		message: `tags must all be strings`,
	},
};
