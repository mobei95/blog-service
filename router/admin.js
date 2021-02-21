const express = require('express');

const router = express.Router();
const User = require('../controller/admin/user');

// 用户注册
router.post('/register', User.register);

module.exports = router;
