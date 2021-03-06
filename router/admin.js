const express = require('express');

const router = express.Router();
const User = require('../controller/admin/user');
const Column = require('../controller/admin/column');
const Article = require('../controller/admin/article');

/**
 * @api {post} /admin/register 后台用户注册
 * @apiDescription 用户注册
 * @apiParam {string} user_name 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "code": 0,
 *   "message": "success"
 * }
 * @apiSampleRequest http://localhost:3000/admin/register
 * @apiVersion 1.0.0
 * */
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
router.put('/column/:column_id', Column.updateColumn);

// 删除栏目
router.delete('/column/:column_id', Column.delColumn);

// 添加文章
router.post('/article', Article.createArticle);

// 获取文章列表
router.get('/article', Article.getArticleList);

// 更新文章信息
router.put('/article/:article_id', Article.updateArticle);

// 删除文章
router.delete('/article/:article_id', Article.removeArticle);

module.exports = router;
