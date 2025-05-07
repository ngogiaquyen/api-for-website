const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST2 || 'localhost', // Địa chỉ host MySQL
  user: process.env.DB_USER2 || 'root', // Tên người dùng MySQL
  password: process.env.DB_PASSWORD2 || '', // Mật khẩu MySQL
  database: process.env.DB_NAME2 || 'my_api' // Tên cơ sở dữ liệu
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến MySQL2:', err.stack);
    return;
  }
  console.log('Kết nối thành công tới MySQL với ID kết nối:', connection.threadId);
});

module.exports = connection;
