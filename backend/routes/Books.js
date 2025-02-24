const express = require('express');
const multer = require('multer');
const Book = require('../models/Book'); // Assuming Book model is set up

const router = express.Router();

// Multer setup to store uploaded PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to handle book uploads
router.post('/books', upload.single('file'), async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const filePath = req.file ? req.file.path : '';

    const newBook = new Book({
      title,
      author,
      publishYear,
      pdfPath: filePath, // Storing PDF file path in DB
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading book', error });
  }
});

module.exports = router;
