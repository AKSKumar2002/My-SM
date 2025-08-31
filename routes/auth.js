const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const User = require('../models/User'); // Adjust the path to your User model
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error in /api/auth/signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
