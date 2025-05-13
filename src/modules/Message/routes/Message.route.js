const express = require('express');
const router = express.Router();
const messageController = require('../controllers/Message.controller');

// router.post('/send', messageController.sendMessage);
// router.get('/seen/:senderId', messageController.setSeenMessage);
// router.get('/not-seen', messageController.getUserNotSeen);
// router.get('/customer/:customerId', messageController.getMessagesByCustomer);
// router.get('/:conversationId', messageController.getMessages);

module.exports = router;
