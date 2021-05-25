// 引入formidable模块
const formidable = require('formidable');
// 引入fs模块
const fs = require('fs');
const path = require('path');
/* 草 在这里没写const path = require('path');
 * 因为没引入path而报错了 排查好久
 * 还有一个月的时间 大概赶不上了吧 QAQ  
 */
const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 要修改的用户id
    const id = req.query.id;
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件的存放路径
    const uploadPath = path.join(__dirname, '../', '../', 'public', 'uploads', 'article-cover');
    form.uploadDir = uploadPath;
    // 保留上传文件后缀
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async(err, fields, files) => {
        /* 三个参数分别是
         *   err错误对象 如果失败err存储错误信息 如成功为NULL
         *   fields对象 保存普通表单数据
         *   files对象 保存和上传文件相关的数据
         */
        // res.send(files);
        // 根据文件大小判断是否有上传图片
        let coverPath = '/admin/assets/img/default.jpg';
        const Path = files.cover.path;
        if (files.cover.size > 128) {
            const type = files.cover.type;
            if (type == "image/jpeg" || type == "image/png") {
                const image = images(Path);
                coverPath = Path.split('public')[1];
                images(image).save(Path, {
                    quality: 50 //保存图片到文件,图片质量为50
                });
                await Article.updateOne({ _id: id }, {
                    cover: coverPath
                });
            } else {
                fs.unlinkSync(uploadPath + Path.split('article-cover')[1]);
            }
        } else {
            fs.unlinkSync(uploadPath + Path.split('article-cover')[1]);
        }
        // res.send(files.cover.path.split('public')[1]);
        // 解决因为没设置发布时间所导致的数据库publishDate值为null
        // res.send(fields.publishDate == '');
        // return;
        if (fields.publishDate == '') {
            fields.publishDate = Date.now();
        }
        await Article.updateOne({ _id: id }, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            content: fields.content
        });
    });
    // 重定向到文章列表页面
    res.redirect('/admin/article');
    // res.send('ok');
}