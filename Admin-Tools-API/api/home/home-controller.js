const util = require('../utils/utilities');

module.exports = () => {
  return {
		home: (req, res) => {
			console.log('Found it!');
			res.json({ 'Success': 'You made it home!' });
		}
  }
}