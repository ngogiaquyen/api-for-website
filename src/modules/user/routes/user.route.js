const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/create', userController.createUser);
router.get('/customer', userController.getCustomer);
// router.get('/user-:id', userController.getUser);

module.exports = router;
