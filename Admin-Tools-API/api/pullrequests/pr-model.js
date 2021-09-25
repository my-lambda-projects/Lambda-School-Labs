const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	login: String,
	avatar_url: String,
  });

const diffCommentSchema = new Schema({
	ghId: Number,
	body: String,
	created: Date,
	file: String,
	user: UserSchema
});

const PrSchema = new Schema({
	url: String,
	state: String,
	name: String,
	createdAt: Date,
	id: Number,
	diffComments: [diffCommentSchema],
	user: UserSchema,
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Pullrequest', PrSchema);