const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    const { uid, aid, content } = req.body;
    await Comment.create({
        aid: aid,
        uid: uid,
        content: content,
        time: new Date()
    });

    res.redirect('/home/article?id=' + aid);
}