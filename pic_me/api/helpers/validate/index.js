const send = require('../../helpers/responses');
const {
	checkEmailAndPassword,
	checkEmailOrPassword,
	// checkForSameEmailOrPassword,
	checkFirstnameAndLastname,
	checkNicknames,
	// checkIdAndLoggedInId,
	checkUser,
	checkForChangedFields,
	checkForChangedSettings,
	checkBalance,
	checkTags,
} = require('./helper');

/**
 * checks for these fields in req.body:
 * - email
 * - password (unhashed)
 * - firstName
 * - lastName
 */
exports.signup = (req, res, next) => {
	const { email, password, firstName, lastName } = req.body;

	if (!checkEmailAndPassword(res, email, password)) return;
	if (!checkFirstnameAndLastname(res, firstName, lastName)) return;
	// if (!checkNicknames(res, nickNames)) return;

	next();
};

/**
 * checks credentials needed for logging in
 */
exports.login = (req, res, next) => {
	// if (req.user) {
	// 	send(res, 422, { message: `user (${req.user.email}) already logged in` });
	// 	return;
	// }

	const { email, password } = req.body;

	checkEmailAndPassword(res, email, password);

	next();
};

/**
 * checks the updated user info
 */
exports.update = (req, res, next) => {
	if (!checkUser(res, req.body.user)) return;
	if (!checkForChangedFields(res, req, req.body.user)) return;

	next();
};

/**
 * checks for updated user settings
 */
exports.settingsData = (req, res, next) => {
	const { email, password } = req.body.user;

	if (!checkEmailOrPassword(res, email, password)) return;
	if (!checkForChangedSettings(res, req, req.body.user)) return;

	next();
};

/**
 * exports.
 */
exports.credits = (req, res, next) => {
	if (!checkBalance(res, req.user)) return;

	next();
};

exports.updatedTags = (req, res, next) => {
	if (!checkTags(res, req.body.tags)) return;

	next();
};
