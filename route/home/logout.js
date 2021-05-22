module.exports = (req, res) => {
    // 清除session
    req.session.destroy(function() {
        // 清除cookie
        res.clearCookie('connect.sid');
        // 重定向到用户登陆界面
        res.redirect('/admin/login');
        // 清除模版中的用户信息
        req.app.locals.userInfo = null;
    });
};