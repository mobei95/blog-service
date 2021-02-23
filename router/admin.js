const express = require('express');

const router = express.Router();
const User = require('../controller/admin/user');
const Column = require('../controller/admin/column');

// 用户注册
router.post('/register', User.register);

// 用户登录
router.post('/login', User.login);

// 修改密码
router.post('/change_password', User.changePassword);

// 创建栏目
router.post('/column', Column.createColumn);

// 获取栏目列表
router.get('/column', Column.getColumnList);

// 更新栏目
router.put('/column', Column.updateColumn);

// 删除栏目
router.delete('/column', Column.delColumn);

module.exports = router;
