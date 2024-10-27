const express = require('express');
const router = express.Router();
const requestController = require('../controllers/exchangeController');

//recieve exchange rqequest
router.get('/received/:userId', requestController.getReceivedRequests);


// Update request status
router.patch('/update/:userId/:id', requestController.updateRequestStatus);

module.exports = router;
