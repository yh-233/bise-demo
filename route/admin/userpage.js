// 引入用户集合构造函数
const { User } = require('../../model/user');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    // 标识 当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递的添加用户错误信息
    const { message, id } = req.query;
    /*
        // 接收客户端传递的当前页参数
        let page = req.query.page || 1;
        // 每一页显示数据条数
        let pagesize = 5;
        // 查询数据总数
        let count = await User.countDocuments({});
        // res.send('用户总数是' + count);
        // 总页数
        let total = Math.ceil(count / pagesize);
        // res.send('总页数是' + total);
        // return;

        // 页码对应的数据查询开始位置
        let start = (page - 1) * pagesize;
        // 将用户信息从数据库中查询出来
        let users = await User.find({}).limit(pagesize).skip(start);
    */
    // 接收客户端传递的页码
    const page = req.query.page || 1;
    let users = await pagination(User).find().page(page).size(5).display(2).exec();

    // 如果用户传递了id参数
    if (id) {
        // 进行修改操作
        let findUser = await User.findOne({ _id: id });
        // 渲染用户页面(编辑用户部分)
        res.render('admin/user', {
            message: message,
            findUser: findUser,
            link: '/admin/user-modify?id=' + id,
            btn: '修改',
            titleTip: '修改用户',
            users: users,
            page: page,
            // total: total
        });
        // res.send(user.email);
        // return;
    } else {
        // 进行添加操作
        res.render('admin/user', {
            message: message,
            link: '/admin/user',
            btn: '提交',
            titleTip: '添加新用户',
            users: users,
            page: page,
            // total: total
        });
    }
};