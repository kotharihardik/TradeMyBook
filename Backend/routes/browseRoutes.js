const express = require('express');
const { browseBooks } = require('../controllers/browseController');

const router = express.Router();

// Route for browsing books
router.get('/browse', browseBooks);

module.exports = router;
