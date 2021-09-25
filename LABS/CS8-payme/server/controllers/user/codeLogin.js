const User = require('../../models/users');
const { makeToken } = require('../../config/auth');
const Twilio = require('twilio');

async function cellCode(req, res) {
  const { TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER } = process.env;
  const { username } = req.body;
  const user = await User.findOne({ username })
    .then(user => user)
    .catch(() => null);

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  let code = '';

  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }

  const recovery = {
    code,
    exp: new Date().getTime() + 1000 * 60 * 5, // Code expires in 5 minutes
  };

  User.findOneAndUpdate({ username }, { recovery }, { new: true })
    .then(usr => {
      const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);

      const options = {
        to: `+1${usr.phone}`,
        from: TWILIO_NUMBER,
        body: `You have requested a login code from GiveMeMyMoney.app.  Your code is ${code}, and will expire in 5 minutes.`,
      };

      client.messages.create(options, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
      });

      res.json({
        message:
          'A recovery code has been sent to the cell phone number on file.',
      });
    })
    .catch(err => console.log(err));

  // console.log(user);
  // res.json({ message: 'just a resting respnse', user, randomCode });
}

async function checkCode(req, res) {
  const { username, code } = req.body;
  const user = await User.findOne({ username })
    .select('-password')
    .populate('invoices')
    .then(user => user)
    .catch(() => null);

  if (!user) return res.status(404).json({ message: 'User does not exist' });
  if (!user.recovery || !user.recovery.code)
    return res
      .status(401)
      .json({ message: 'No recovery code found.  Please request a new code.' });

  await User.findByIdAndUpdate(user._id, { recovery: null }, { new: true })
    .then(x => x)
    .catch(e => e);

  if (user.recovery.exp - new Date().getTime() < 0) {
    res
      .status(401)
      .json({ message: 'Code expired.  Please request a new code.' });
  } else if (user.recovery.code === code) {
    const tknUser = {
      _id: user._id,
      username: user.username,
    };
    const token = makeToken(tknUser);
    User.findById(user._id)
      .select('-password -img')
      .populate('invoices')
      .then(usr => {
        res.json({ token, user: usr });
      });
  } else {
    res.status(401).json({
      message: 'The code entered is invalid.  Please request a new code.',
    });
  }

  // user.recovery = null;
  // console.log(user.recovery);
  // res.json(user);
}

module.exports = {
  cellCode,
  checkCode,
};
