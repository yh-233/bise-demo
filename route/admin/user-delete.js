const fs = require('fs');
const path = require('path');
const { User } = require('../../model/user');
const uploadPath = path.join(__dirname, '../', '../', 'public', 'uploads', 'avatar');
module.exports = async(req, res) => {
    // res.send('ok');
    // 获取id
    // req.send(req.query.id);
    const id = { _id: req.query.id };
    let user = await User.findOne(id);
    if (user.avatar != "/admin/assets/img/default.png") {
        fs.unlinkSync(uploadPath + user.avatar.split('avatar')[1]);
    }
    await User.findOneAndDelete(id);
    res.redirect('/admin/user?page=1');
}