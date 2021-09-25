module.exports = {
	google: {
		clientSecret: process.env.clientSecret,
		clientID: process.env.clientID
	},
	postgres: {
		postgresURI: 'http://tenantly-back.herokuapp.com'
	},
	nodemailer: {
		USER: process.env.node_user,
		PASS: process.env.node_pass
	}
};
