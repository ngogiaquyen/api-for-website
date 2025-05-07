const connection = require('~/config/db3');

// Gửi tin nhắn mới
exports.sendMessage = (messageData, callback) => {
  const query = 'INSERT INTO messages (conversation_id, sender_id, receiver_id, content, message_type, timestamp, seen, is_edited, is_deleted, reply_to_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const { conversation_id, sender_id, receiver_id, content, message_type, timestamp, seen, is_edited, is_deleted, reply_to_id } = messageData;

  connection.query(query, [conversation_id, sender_id, receiver_id, content, message_type, timestamp, seen, is_edited, is_deleted, reply_to_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Lấy danh sách tin nhắn trong một cuộc trò chuyện
exports.getMessages = (conversationId, callback) => {
  const query = 'SELECT * FROM messages WHERE conversation_id = ?';
  connection.query(query, [conversationId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Lấy danh sách tin nhắn trong một cuộc trò chuyện
exports.getConversations = (customerId, callback) => {
  const query = 'SELECT * FROM conversations WHERE customer_id = ?';
  console.log(customerId)
  connection.query(query, [customerId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]);
  });
};
