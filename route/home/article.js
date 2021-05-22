const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    // 接收客户端传递过来的id
    const id = req.query.id;
    // 根据id查询
    let article = await Article.findOne({ _id: id }).populate('author');
    // 多级联合查询 为了保证兼容性需要这样写
    let aStr = JSON.stringify(article);
    let aJson = JSON.parse(aStr);
    // 查询数据总数
    let count = await Comment.countDocuments({ aid: id });
    // res.send(article);
    // return;
    let comments = await Comment.find({ aid: id }).populate('uid');
    let cStr = JSON.stringify(comments);
    let cJson = JSON.parse(cStr);
    res.render('home/article', {
        count: count,
        article: aJson,
        comments: cJson
    });
}