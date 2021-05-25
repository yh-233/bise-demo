const { User } = require('../../model/user');
// 引入bcrypt模块
const bcrypt = require('bcrypt');
// 引入formidable模块
const formidable = require('formidable');
// 引入path模块
const path = require('path');
// 引入图片处理imgages模块
const images = require('images');
// 引入fs模块
const fs = require('fs');

module.exports = async(req, res, next) => {
    /*
    // res.send('成功');
    // 接收客户端传递的请求参数
    const { username, email, role, state, password } = req.body;
    // 要修改的用户id
    const id = req.query.id;
    // res.send(body.password);
    let user = await User.findOne({ _id: id });

    // 密码比对
    const isVal = await bcrypt.compare(password, user.password);
    if (isVal) {
        //比对成功
        // res.send('密码比对成功');
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向页面
        res.redirect('/admin/user');
    } else {
        //比对失败
        let obj = { path: '/admin/user', message: '密码错误不能对用户进行修改', id: id };
        next(JSON.stringify(obj));
    }
    */
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件的存放路径
    const uploadPath = path.join(__dirname, '../', '../', 'public', 'uploads', 'avatar');
    form.uploadDir = uploadPath;
    // 保留上传文件后缀
    form.keepExtensions = true;
    // 限制文件大小(最高5M)
    form.maxFieldsSize = 5 * 1024 * 1024;

    // 解析表单
    form.parse(req, async(err, fields, files) => {
        /* 三个参数分别是
         *   err错误对象 如果失败err存储错误信息 如成功为NULL
         *   fields对象 保存普通表单数据
         *   files对象 保存和上传文件相关的数据
         */
        // 要修改的用户id
        const id = req.query.id;
        // res.send(body.password);
        let user = await User.findOne({ _id: id });
        // res.send(user);
        // 密码比对
        const isVal = await bcrypt.compare(fields.password, user.password);
        // res.send(isVal);

        const Path = files.avatar.path;
        if (isVal) {
            //比对成功
            // res.send('密码比对成功');
            // 根据文件大小判断是否有上传图片
            if (files.avatar.size > 128) {
                // 判断上传的文件是否是jpg png图片格式的
                const type = files.avatar.type;
                if (type == "image/jpeg" || type == "image/png") {
                    const image = images(Path);
                    let w = image.width();
                    let h = image.height();
                    if (width != height) {
                        if (w < h) {
                            images(image, 0, (h - w) / 2, w, w).save(Path, {
                                quality: 50 //保存图片到文件,图片质量为50
                            });
                        } else {
                            images(image, (w - h) / 2, 0, h, h).save(Path, {
                                quality: 50 //保存图片到文件,图片质量为50
                            });
                        }
                    }
                    await User.updateOne({ _id: id }, {
                        avatar: Path.split('public')[1]
                    });
                } else {
                    fs.unlinkSync(uploadPath + Path.split('avatar')[1]);
                }
            } else {
                fs.unlinkSync(uploadPath + Path.split('avatar')[1]);
            };
            await User.updateOne({ _id: id }, {
                username: fields.username,
                email: fields.email,
                role: fields.role,
                state: fields.state
            });
            // res.send(files);
            // return;
            // 重定向页面
            res.redirect('/admin/user');
        } else {
            //比对失败
            let obj = { path: '/admin/user', message: '密码错误不能对用户进行修改', id: id };
            next(JSON.stringify(obj));
            return;
        };

    });
};