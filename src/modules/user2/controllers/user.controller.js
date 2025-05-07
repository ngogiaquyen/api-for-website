const userService = require('../services/user.service');

exports.getUser = async (req, res) => {
  try {
    const result = await userService.getUsers(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.userId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
