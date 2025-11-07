const express = require('express');
const router = express.Router();
const librat = require('../models/Liber');

// Get all books
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

// Add a new book
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

// Get a book by ID
router.get('/book/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await librat.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching book' });
  }
});

// Update a book by ID
router.put('/updatebook/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, year, isbn, genre, img,clicks} = req.body;
  try {
    if(!bookId){
      return res.status(404).json({ message: 'Book Not Found' });
    }
    const updatedBook = await librat.findById(bookId);
      updatedBook.title= title,
      updatedBook.author= author,
      updatedBook.year= year,
      updatedBook.isbn= isbn,
      updatedBook.genre= genre,
      updatedBook.img= img
      if (clicks) updatedBook.clicks = clicks + 1;
      
    await updatedBook.save();
    return res.status(200).json({ message: `Book ${updatedBook.title} updated successfully` });
  } catch (error) {
    return res.status(400).json({ message: 'Error updating book' });
  }
});
module.exports = router;