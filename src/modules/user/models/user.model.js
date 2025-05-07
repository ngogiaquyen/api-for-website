const connection = require('~/config/db2');

// Tạo người dùng mới
exports.createUser = (userData, callback) => {
  const query = 'INSERT INTO users (name, email, role, specialty, is_guest, ip_address, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const { name, email, role, specialty, is_guest, ip_address, status } = userData;

  connection.query(query, [name, email, role, specialty, is_guest, ip_address, status], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Lấy thông tin người dùng theo ID
exports.getUser = (userId, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]);
  });
};

// Lấy thông tin người dùng theo ID
exports.getCustomer = (callback) => {
  const query = 'SELECT * FROM users WHERE role = \'customer\'';
  connection.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

exports.checkOrCreateUser = (user, callback) => {
  const checkQuery = "SELECT id FROM users WHERE id = ?";
  connection.query(checkQuery, [user.id], (err, results) => {
    if (err) {
      console.error('❌ Lỗi khi kiểm tra user:', err.sqlMessage || err);
      return callback(err, null);
    }

    if (results.length > 0) {
      // ✅ User đã tồn tại
      console.log('✅ User đã tồn tại:', results[0].id);
      return callback(null, results[0].id);
    } else {
      // ⛔ Nếu chưa có thì tạo mới
      const insertQuery = `
        INSERT INTO users (id, name, email, role, specialty, is_guest, ip_address, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        insertQuery,
        [
          user.id,
          user?.name || "no name",
          user?.email || null,
          user?.role || 'customer',
          user?.specialty || null,
          user?.is_guest || 0,
          user?.ip_address || null,
          user?.status || 'offline',
        ],
        (err, result) => {
          if (err) {
            console.error('❌ Lỗi khi tạo user:', err.sqlMessage || err);
            return callback(err, null);
          }

          console.log('✅ User mới đã được tạo:', user.id);
          return callback(null, user.id);
        }
      );
    }
  });
};
