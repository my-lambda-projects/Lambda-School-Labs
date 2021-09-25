const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    required: false,
    unique: false,
  },
  subscriber: {
    type: Boolean,
    required: true,
    default: false,
  },
  cards: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Card',
  },
});
UserSchema.static('authenticate', async function authenticate(username, password) {
  const user = await this.findOne({ username }).exec();
  if (!user) return false;
  const validated = await bcrypt.compare(password, user.password);

  return validated ? user : false;
});

UserSchema.static('exists', async function exists(username) {
  const user = await this.findOne({ username }).exec();
  return !!user;
});

module.exports = mongoose.model('User', UserSchema);
