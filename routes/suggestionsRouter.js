const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const User = require('../models/userModel');

// Import the suggestion model
const Suggestion = require('../models/SuggestionModel.js');

// Import the authentication middleware
const authMiddleware = require('../services/authMiddleware');

// Endpoint for creating a new suggestion
router.post('/suggestions', authMiddleware, async (req, res) => {
  const { title, description, createdBy } = req.body;

  try {
    // Check if createdBy field matches any name in the database
    const userExists = await User.findOne({ name: createdBy });
    if (!userExists) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newSuggestion = new Suggestion({
      _id: uuidv4(),
      title,
      description,
      createdBy,
    });

    const savedSuggestion = await newSuggestion.save();
    res.status(201).json(savedSuggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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
router.put('/suggestions/:id', authMiddleware, async (req, res) => {
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
router.delete('/suggestions/:id', authMiddleware, async (req, res) => {
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
