const connection = require('../db');

// Thêm tệp đính kèm vào tin nhắn
exports.addAttachment = (attachmentData, callback) => {
  const query = 'INSERT INTO attachments (message_id, filename, file_type, file_url, uploaded_at, size, is_sensitive) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const { message_id, filename, file_type, file_url, uploaded_at, size, is_sensitive } = attachmentData;

  connection.query(query, [message_id, filename, file_type, file_url, uploaded_at, size, is_sensitive], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Lấy tệp đính kèm theo ID tin nhắn
exports.getAttachments = (messageId, callback) => {
  const query = 'SELECT * FROM attachments WHERE message_id = ?';
  connection.query(query, [messageId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
