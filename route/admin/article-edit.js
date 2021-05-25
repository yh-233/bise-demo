const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 标识 当前访问的是编辑文章页面
    req.app.locals.currentLink = 'article-edit';
    // 接收客户端传递的添加用户错误信息
    const { id } = req.query;

    // 如果用户传递了id参数
    if (id) {
        // 进行修改操作
        let findArticle = await Article.findOne({ _id: id });
        // 渲染用户页面(编辑用户部分)
        res.render('admin/post-add.art', {
            findArticle: findArticle,
            link: '/admin/article-modify?id=' + id,
            btn: '修改',
            titleTip: '修改文章'
        });
        // res.send(user.email);
        // return;
    } else {
        // 进行添加操作
        res.render('admin/post-add.art', {
            link: '/admin/article-add',
            btn: '提交',
            titleTip: '添加新文章'
        });
    }
}