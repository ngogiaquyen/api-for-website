const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST3 || 'localhost', // Địa chỉ host MySQL
  user: process.env.DB_USER3 || 'root', // Tên người dùng MySQL
  password: process.env.DB_PASSWORD3 || '', // Mật khẩu MySQL
  database: process.env.DB_NAME3 || 'my_api' // Tên cơ sở dữ liệu
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến MySQL3:', err.stack);
    return;
  }
  console.log('Kết nối thành công tới MySQL với ID kết nối:', connection.threadId);
});

module.exports = connection;
