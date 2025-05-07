const Conversation = require('../models/Conversation.model');

// Bắt đầu cuộc trò chuyện mới
exports.startConversation = (req, res) => {
  const conversationData = req.body;
  Conversation.startConversation(conversationData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error starting conversation', error: err });
    }
    res.status(201).json({ message: 'Conversation started successfully', data: result });
  });
};

// Lấy danh sách cuộc trò chuyện
exports.getConversations = (req, res) => {
  Conversation.getConversations((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving conversations', error: err });
    }
    res.status(200).json(result);
  });
};
