const guard = (req, res, next) => {
    // 没登陆 重定向
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果登陆 
        // 判断是否为普通用户
        if (req.session.role == 'normal') {
            return res.redirect('/home?page=1');
        }
        next();
    }
}

module.exports = guard;