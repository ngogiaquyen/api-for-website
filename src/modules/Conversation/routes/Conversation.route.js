const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/Conversation.controller');

router.post('/start', conversationController.startConversation);
router.get('/', conversationController.getConversations);

module.exports = router;
