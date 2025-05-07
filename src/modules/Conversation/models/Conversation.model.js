const connection = require("~/config/db3");

// Bắt đầu cuộc trò chuyện mới
exports.startConversation = (conversationData, callback) => {
  const query =
    "INSERT INTO conversations (customer_id, lawyer_id, started_at, status, assigned_by) VALUES (?, ?, ?, ?, ?)";
  const { customer_id, lawyer_id, started_at, status, assigned_by } =
    conversationData;

  connection.query(
    query,
    [customer_id, lawyer_id, started_at, status, assigned_by],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Lấy danh sách cuộc trò chuyện
exports.getConversations = (callback) => {
  const query = "SELECT * FROM conversations";
  connection.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};


exports.checkOrCreateConversation = (conversation_id, customer_id, lawyer_id, assigned_by, callback) => {
  const checkQuery = "SELECT id FROM conversations WHERE id = ?";
  connection.query(checkQuery, [conversation_id], (err, results) => {
    if (err) return callback(err, null);

    if (results.length > 0) {
      // Tồn tại
      return callback(null, results[0].id);
    } else {
      // Chưa tồn tại -> tạo mới
      console.log("chưa tồn tại")
      const insertQuery = `
        INSERT INTO conversations (id, customer_id, lawyer_id, started_at, status, assigned_by)
        VALUES (?, ?, ?, NOW(), ?, ?)
      `;
      console.log("data: ", [conversation_id, customer_id, lawyer_id, 'active', assigned_by])
      connection.query(insertQuery, [conversation_id, customer_id, lawyer_id, 'active', assigned_by], (err, result) => {
        if (err) return callback(err, null);
        return callback(null, conversation_id); // dùng id đã truyền vào
      });
    }
  });
};
