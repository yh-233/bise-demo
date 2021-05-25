// 引入bcrypt模块
const bcrypt = require('bcrypt');
//导入用户集合构造函数
const { User } = require('../../model/user');

// 实现登陆功能
module.exports = async(req, res) => {
    // 接收请求参数
    // res.send(req.body);
    const { email, password } = req.body;
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮箱或密码错误!' });
    }
    // 根据邮箱地址查询用户信息
    let user = await User.findOne({ email });
    if (user) {
        // 比对传递的密码与用户信息中的密码(返回布尔值)
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            // 登陆成功
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            // 用户角色进行判断
            if (user.role == 'admin') {
                // 超级管理员进入后台
                res.redirect('/admin/user');
            } else {
                // 普通用户到博客首页
                res.redirect('/home');
            }
            res.redirect('/admin/user');
            // res.send('成功!');
        } else {
            return res.status(400).render('admin/error', { msg: '邮箱或密码错误!' });
        }
    } else {
        // 没有查询到用户
        return res.status(400).render('admin/error', { msg: '邮箱或密码错误!' });
    }
};