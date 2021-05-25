// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');


module.exports = async(req, res) => {
    // 接收客户端传递的页码
    const page = req.query.page || 1;
    // 标识 当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询所有文章数据
    /*
     *page指定当前页
     *size指定每页显示几条数据
     *display指定客户端显示多少页码
     *exec向数据库发送查询请求
     */
    let articles = await pagination(Article).find().page(page).size(5).display(2).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);
    // res.send(articles);
    // 渲染文章列表模版
    res.render('admin/posts.art', {
        articles: json,
        page: page
    });
}