// Backend/routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');


// Get a specific request by user ID and request ID
router.get('/user/:userId/:requestId', requestController.getRequestByUserIdAndRequestId);


// Create a new exchange request
router.post('/exchange', requestController.createExchangeRequest);

// Accept an exchange request
router.patch('/exchange/:id/accept', requestController.acceptExchangeRequest);

// Reject an exchange request
router.patch('/exchange/:id/reject', requestController.rejectExchangeRequest);

// Get requests for a specific user
router.get('/user/:userId', requestController.getUserRequests);

// PATCH route for updating a specific exchange request
router.patch('/exchange/:userId/:requestId', requestController.updateExchangeRequest);

// Delete a request
router.delete('/delete/:requestId', requestController.deleteRequest);







module.exports = router;
