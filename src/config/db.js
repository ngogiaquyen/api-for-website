const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Địa chỉ host MySQL
  user: process.env.DB_USER || 'root', // Tên người dùng MySQL
  password: process.env.DB_PASSWORD || '', // Mật khẩu MySQL
  database: process.env.DB_NAME || 'my_api' // Tên cơ sở dữ liệu
});

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_NAME)

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến MySQL:', err.stack);
    return;
  }
  console.log('Kết nối thành công tới MySQL với ID kết nối:', connection.threadId);
});

module.exports = connection;
