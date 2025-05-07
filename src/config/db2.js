const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST2 || 'localhost',
  user: process.env.DB_USER2 || 'root',
  password: process.env.DB_PASSWORD2 || '',
  database: process.env.DB_NAME2 || 'my_api'
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến MySQL2:', err.stack);
    return;
  }
  console.log('Kết nối thành công tới MySQL 2 với ID kết nối:', connection.threadId);

  const createTables = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      role ENUM('customer', 'lawyer') NOT NULL,
      specialty VARCHAR(100),
      is_guest BOOLEAN DEFAULT FALSE,
      ip_address VARCHAR(45),
      status ENUM('online', 'offline') DEFAULT 'offline'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS conversations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      lawyer_id INT NOT NULL,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ended_at DATETIME,
      status ENUM('active', 'closed', 'pending') DEFAULT 'pending',
      last_message_at DATETIME,
      last_message_preview VARCHAR(255),
      assigned_by INT,
      FOREIGN KEY (customer_id) REFERENCES users(id),
      FOREIGN KEY (lawyer_id) REFERENCES users(id),
      FOREIGN KEY (assigned_by) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conversation_id INT NOT NULL,
      sender_id INT NOT NULL,
      receiver_id INT NOT NULL,
      content TEXT,
      message_type ENUM('text', 'image', 'file', 'system') DEFAULT 'text',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      seen BOOLEAN DEFAULT FALSE,
      is_edited BOOLEAN DEFAULT FALSE,
      is_deleted BOOLEAN DEFAULT FALSE,
      reply_to_id INT,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id),
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (receiver_id) REFERENCES users(id),
      FOREIGN KEY (reply_to_id) REFERENCES messages(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS attachments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      message_id INT NOT NULL,
      filename VARCHAR(255),
      file_type VARCHAR(50),
      file_url TEXT,
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      size INT,
      is_sensitive BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (message_id) REFERENCES messages(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  connection.query(createTables, (err, results) => {
    if (err) {
      console.error('Lỗi khi tạo bảng:', err);
    } else {
      console.log('Tạo bảng thành công!');
    }

    connection.end(); // Đóng kết nối sau khi xong
  });
});
