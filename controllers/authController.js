// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel').default;
const { secret, expiresIn } = require('../config/authConfig');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  try {
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, secret, { expiresIn });
  res.json({ token });
};
