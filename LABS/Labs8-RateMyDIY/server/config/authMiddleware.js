const authDB = require('../models/authModel');

function authorize(req, res, next) {
	const { user_id } = req.body;

	if (!user_id) {
		res.status(403).json({ error: 'Not logged in.' });
	}
	if (!req.user) {
		res.status(403).json({ error: 'No login cookie.' });
	}

	let sub = req.user.profile._json.sub.split('|');
	let auth_id = sub[1];

	authDB.getAuthID(user_id).then(db_auth_id => {
		if (db_auth_id === auth_id) {
			next();
		} else {
			res.status(403).json({ error: 'Not authorized.' });
		}
	});
}

module.exports = authorize;
