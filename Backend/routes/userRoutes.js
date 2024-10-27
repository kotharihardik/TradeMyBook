const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get user profile
router.get('/:userId', userController.getUserProfile);

// Route to update user profile
router.put('/:userId', userController.updateUserProfile);

module.exports = router;
