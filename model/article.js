//引入mongoose第三方模块
const mongoose = require('mongoose');

// 创建集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请填写作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: '/admin/assets/img/default.jpg'
    },
    content: {
        type: String
    }
});

// 创建集合
const Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
}