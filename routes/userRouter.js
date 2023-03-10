const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Get user profile
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('User not found.');
    }
    res.json({ user: { _id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile.' });
  }
});


// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = req.body.email;
    }
    if (req.body.name && req.body.name !== user.name) {
      user.name = req.body.name;
    }
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log('Error updating user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user account
router.delete('/profile', async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findByIdAndDelete(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted' });
  } catch (error) {
    console.log('Error deleting user account:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
