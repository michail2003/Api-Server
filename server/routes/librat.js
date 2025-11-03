const express = require('express');
const router = express.Router();
const librat = require('../models/Liber');

router.get('/', async (req, res) => {
  try {
    const allBooks = await librat.find();
    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching books' });
  }
});

router.post('/postbook', async (req, res) => {
  const { title, author, year, isbn, genre, img } = req.body;
  try {
    const newBook = await librat.create({
      title: title,
      author: author,
      year: year,
      isbn: isbn,
      genre: genre,
      img: img
    });
    await newBook.save();
    return res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    // Different responses for different errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(409).json({ message: 'Book already exists' });
    }

    // Default case (unknown error)
    return res.status(500).json({ message: `Unexpected error: ${error.message}` });
  }
}
);
module.exports = router;