const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET = process.env.APP_SECRET;
const AuthController = {
  async register(req, res) {
    try {
      const { username } = req.body;
      let { password } = req.body;

      if (!username || !password) {
        res.status(422).json({ error: 'Both username and password required' });
        return;
      }

      if (await User.exists(username)) {
        res.status(409).json({ error: 'User already exists.' });
        return;
      }
      password = await bcrypt.hash(password, 12);
      const user = await User.create({ username, password });
      const payload = { id: user._id, username: user.username };
      const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
      res.json({ user, token });
    } catch (e) {
      console.log(e);
      res.status(422).json({ error: 'Failed to register' });
    }
  },
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(422).json({ error: 'Request must have both username and password.' });
    const user = await User.authenticate(username, password);
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    return user ? res.json({ user, token }) : res.status(403).json({ error: 'failed to authenticate' });
  },
  async update(req, res) {
    try {
      const {
        username,
        newUsername,
        password,
        confirmPassword,
      } = req.body;

      if (password !== confirmPassword) {
        res.status(403).send({ error: 'Password was not confirmed' });
        return;
      }

      const user = await User.authenticate(username, password);
      if (!user) {
        res.status(403).send({ error: 'Could not authenticate' });
        return;
      }

      user.set({ username: newUsername });
      const updatedUser = await user.save();
      res.send({ user: updatedUser });
    } catch (e) {
      res.status(422).send({ error: 'Failed to update user', e });
    }
  },
  async reset(req, res) {
    const {
      username,
      password,
      confirmPassword,
      confirmNewPassword,
    } = req.body;

    let { newPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(422).send({ error: 'Current Passwords do not match.' });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      res.status(422).send({ error: 'New Passwords do not match.' });
      return;
    }
    const user = await User.authenticate(username, password);
    if (!user) {
      res.status(403).send({ error: 'Could not authenticate' });
      return;
    }
    newPassword = await bcrypt.hash(newPassword, 12);
    user.set({ password: newPassword });
    const updatedUser = await user.save();
    res.send({ user: updatedUser });
  },
};

module.exports = AuthController;
