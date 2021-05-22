//引入mongoose第三方模块
const mongoose = require('mongoose');
// 创建集合规则
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});
// 创建集合
const Comment = mongoose.model('Comment', commentSchema);

// 作为模块成员导出
module.exports = {
    Comment
}