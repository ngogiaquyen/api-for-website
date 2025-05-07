const connection = require('~/config/db2');

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

// set seen cho tin nhắn
exports.setSeenMessage = (senderId, callback) => {
  const query = 'UPDATE messages SET seen = true WHERE sender_id = ?';
  connection.query(query, [senderId], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    // Có thể kiểm tra thêm nếu không có bản ghi nào bị ảnh hưởng
    if (result.affectedRows === 0) {
      return callback(new Error('Không tìm thấy tin nhắn để cập nhật'), null);
    }

    callback(null, result);
  });
};

// lấy danh sách các tin nhắn cuối cùng của mỗi conversation
exports.getLastConversation = (callback) => {
  const query = `
    SELECT m.*
    FROM messages m
    INNER JOIN (
      SELECT conversation_id, MAX(timestamp) AS latest_time
      FROM messages
      GROUP BY conversation_id
    ) last_msg
    ON m.conversation_id = last_msg.conversation_id AND m.timestamp = last_msg.latest_time
  `;

  connection.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};


// Lấy danh sách tin nhắn trong một cuộc trò chuyện
exports.getConversations = (customerId, callback) => {
  const query = 'SELECT * FROM conversations WHERE customer_id = ?';
  connection.query(query, [customerId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]);
  });
};
