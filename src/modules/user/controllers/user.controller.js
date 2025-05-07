const User = require('../models/user.model');

// Tạo người dùng mới
exports.createUser = (req, res) => {
  const userData = req.body;
  User.createUser(userData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user', error: err });
    }
    res.status(201).json({ message: 'User created successfully', data: result });
  });
};

// Lấy thông tin người dùng
exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.getUser(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  });
};

// Lấy thông tin người dùng
exports.getCustomer = (req, res) => {
  User.getCustomer((err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(user);
  });
};
