// 引入express模块
const express = require('express');
// 展示页面路由
const admin = express.Router();

/* 
 *   创建用户列表路由
 */

// 渲染登陆页面
admin.get('/login', require('./admin/loginpage'));
// 实现登陆功能
admin.post('/login', require('./admin/login'));
// 创建用户列表路由
admin.get('/user', require('./admin/userpage'));
// 实现退出登陆功能
// admin.get('/logout', require('./admin/logout'));
// 创建新建用户列表路由
// admin.get('/user-edit', require('./admin/user-edit'));
// 实现用户添加功能路由
admin.post('/user', require('./admin/user-edit-fn'));
// 实现用户编辑操作功能路由
admin.post('/user-modify', require('./admin/user-modify'));
// 实现用户删除操作功能路由
admin.get('/delete', require('./admin/user-delete'));

// 文章列表页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));
// 实现文章删除操作功能路由
admin.get('/article-delete', require('./admin/article-delete'));
// 实现文章编辑操作功能路由
admin.post('/article-modify', require('./admin/article-modify'));

module.exports = admin;