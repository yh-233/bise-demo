// 引入express框架
const express = require('express');
// 创建路由
const home = express.Router();

// 前台页面展示
home.get('/', require('./home/default'));

// 文章详情展示
home.get('/article', require('./home/article'));

// 评论功能
home.post('/comment', require('./home/comment'));

// 退出登陆功能
home.get('/logout', require('./home/logout'));

// 注册功能
home.get('/register', require('./home/register'));

// 实现注册功能
home.post('/register', require('./home/register-add'));


// 将路由对象作为模块成员导出
module.exports = home;