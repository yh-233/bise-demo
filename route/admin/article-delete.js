const fs = require('fs');
const path = require('path');
const { Article } = require('../../model/article');
const uploadPath = path.join(__dirname, '../', '../', 'public', 'uploads', 'article-cover');
module.exports = async(req, res) => {
    // res.send('ok');
    // 获取id
    // req.send(req.query.id);
    const id = { _id: req.query.id };
    let article = await Article.findOne(id);
    if (article.cover != '/admin/assets/img/default.jpg') {
        fs.unlinkSync(uploadPath + article.cover.split('article-cover')[1]);
    }
    await Article.findOneAndDelete(id);
    res.redirect('/admin/article');
}