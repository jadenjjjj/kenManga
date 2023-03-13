const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const User = require('../models/userModel');
const bodyParser = require('body-parser');

// Import the suggestion model
const Suggestion = require('../models/SuggestionModel.js');

// Import the authentication middleware
// const authMiddleware = require('../services/authMiddleware');
const isAuthenticated = (req, res, next) => {
  console.log('Checking authentication...');
  console.log('req.headers: ', req.headers);

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.use(express.json());

// Endpoint for creating a new suggestion
router.post('/suggestions', isAuthenticated, async (req, res) => {
  try {
    const suggestion = new Suggestion({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user: req.user._id,
      text: req.body.text,
    });

    const result = await suggestion.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint for getting all suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint for getting a single suggestion by ID
router.get('/suggestions/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    res.json(suggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint for updating a suggestion
router.put('/suggestions/:id', isAuthenticated, async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    suggestion.title = req.body.title;
    suggestion.description = req.body.description;

    const updatedSuggestion = await suggestion.save();

    res.json(updatedSuggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint for deleting a suggestion
router.delete('/suggestions/:id', isAuthenticated, async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);

    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }

    await suggestion.remove();

    res.json({ message: 'Suggestion removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
