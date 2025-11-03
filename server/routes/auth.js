const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'michael_secret_key_2003';

router.post('/register',async (req, res) => {
  const {
    email,
    password,
    name,
    surname
  } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
try{
  const newUser = await User.create({
    email: email,
    password: hashedPassword,
    name: name,
    surname: surname
  });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
  res.status(400).json({ message: `user already exists` });
}

});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ user : user.email, username: user.name }, JWT_SECRET, { expiresIn: '1m' });
  res.json({ message: 'Logged Succedfully', token: token });
});
module.exports = router;