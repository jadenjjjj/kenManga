const express = require('express');
const router = express.Router();
const Manga = require('../models/mangaModel');

// Create a new manga
router.post('/create', async (req, res) => {
    console.log('Create manga route hit');
    try {
    const manga = new Manga(req.body);
    const newManga = await manga.save();
    res.status(201).json(newManga);
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
