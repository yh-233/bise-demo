const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 接收客户端传递的页码
    const page = req.query.page || 1;
    let result = await pagination(Article).page(page).size(12).display(2).find().populate('author').exec();
    // res.send(result);
    // return;
    /*  let str = JSON.stringify(articles);
     *  let json = JSON.parse(str);
     *  防止报错 SyntaxError: Unexpected token R in JSON at position 0 at JSON.parse ()
     */
    let str = JSON.stringify(result);
    let json = JSON.parse(str);

    res.render('home/index.art', {
        result: json,
        page: page
    });
}