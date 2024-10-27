const express = require('express');
const { addBook, getBooksByUser, getAllBooks , deleteBook} = require('../controllers/bookController');

const router = express.Router();

router.post('/add', addBook);           // Endpoint for adding a book
router.get('/user/:userId', getBooksByUser);  // Endpoint for fetching books by a specific user
router.get('/all', getAllBooks);        // Endpoint for fetching all books
router.delete('/delete/:userId/:id', deleteBook);      // Endpoint for deleting a book by ID

module.exports = router;
