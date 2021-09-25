const TwitterStrategy = require('passport-twitter').Strategy;

const TWITTER = JSON.parse(process.env.TWITTER);

const User = require('../../users/model');

module.exports = new TwitterStrategy(
	{
		consumerKey: TWITTER.consumerKey,
		consumerSecret: TWITTER.consumerSecret,
		callbackURL: TWITTER.callbackURL,
	},
	function(token, tokenSecret, profile, done) {
		const user = {};

		/* profile is the authenticated Twitter user object. more info: https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object */
		const twitterUserObject =
			profile._json; /* profile has a key `_json` with value of type object */

		/* because api access is not elevated, cannot access email address, so use twitter internal id */
		user.email = `twitter${twitterUserObject.id}`;
		/* profile._json is an object with a key `name`, with value of type `string` formatted as "FIRST LAST" */
		if (twitterUserObject.name.includes(' ')) {
			user.firstName = twitterUserObject.name.split(' ')[0];
			user.lastName = twitterUserObject.name.split(' ')[1];
		} else {
			user.firstName = twitterUserObject.name;
			user.lastName = twitterUserObject.name;
		}
		/* set received token and token secret as password to be hashed */
		user.password = token + ' ' + tokenSecret;

		User.findOrCreate({ email: user.email }, user, (err, user) => {
			if (err) return done(err);

			done(null, user);
		});
	},
);
