const express = require('express');

const router = express.Router();
const User = require('../controller/admin/user');

// 用户注册
router.post('/register', User.register);

// 用户登录
router.post('/login', User.login);

module.exports = router;
