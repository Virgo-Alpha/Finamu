// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // you can adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword // Save the hashed password
    });

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5m' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log("Login request received")
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for the email" + email)
      return res.status(400).json({ error: 'EMAIL_NOT_FOUND' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("User " + email + " password " + password + " is incorrect. The correct password is " + user.password)
      return res.status(400).json({ error: 'INVALID_CREDENTIALS' });
    }

    req.session.userId = user.id;

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5m' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    console.log("User " + email + " logged in successfully with id " + req.session.userId)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clear the cookie
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
    }

    // Generate a password reset token (use a package like 'crypto' or 'uuid')
    const resetToken = 'generatedTokenHere';

    // TODO: Send email with reset link (containing the token)
    // Example: `http://yourfrontend.com/reset-password/${resetToken}`

    res.json({ msg: 'Password reset link sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
