// 引入用户集合构造函数
const { User, validateUser } = require('../../model/user');
// 引入bcrypt模块
const bcrypt = require('bcrypt');
// 引入formidable模块
const formidable = require('formidable');
// 引入path模块
const path = require('path');
// 引入fs模块
const fs = require('fs');
// 引入图片处理imgages模块
const images = require('images');

module.exports = async(req, res, next) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件的存放路径
    const uploadPath = path.join(__dirname, '../', '../', 'public', 'uploads', 'avatar');
    form.uploadDir = uploadPath;
    // 保留上传文件后缀
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // 头像路径
        const path = files.avatar.path;
        const obj = {
            username: fields.username,
            email: fields.email,
            password: fields.password,
            role: fields.role,
            state: fields.state
        };
        //验证添加的用户是否符合规则
        try {
            await validateUser(obj);
            // await validateUser(req.body);
        } catch (e) {
            // 没通过
            // return res.redirect(`/admin/user?message=${e.message}`);
            // JSON.stringify() 将对象数据转为字符串
            return next(JSON.stringify({ path: '/home/register', message: e.message }));
        };
        // 根据邮箱地址查询用户是否存在
        let user = await User.findOne({ email: fields.email });
        // 如果用户存在
        if (user) {
            return next(JSON.stringify({ path: '/home/register', message: '邮箱地址已被占用' }));
        }
        if (fields.password == fields.password_s) {
            // 对密码进行hash加密
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(fields.password, salt);
            fields.password = password;
            // return next(JSON.stringify({ path: '/home/register', message: '密码OK' }));
            // 根据文件大小判断是否有上传图片
            let avatarPath = '/admin/assets/img/default.png';
            if (files.avatar.size > 128) {
                // 判断上传的文件是否是jpg png图片格式的
                const type = files.avatar.type;
                if (type == "image/jpeg" || type == "image/png") {
                    const image = images(path);
                    let width = image.width();
                    let height = image.height();
                    if (width != height) {
                        if (width < height) {
                            images(image, 0, (height - width) / 2, width, width).save(path);
                        } else {
                            images(image, (width - height) / 2, 0, height, height).save(path);
                        }
                    }
                    avatarPath = path.split('public')[1];
                } else {
                    fs.unlinkSync(uploadPath + path.split('avatar')[1]);
                }
            } else {
                fs.unlinkSync(uploadPath + path.split('avatar')[1]);
            }
            // 将用户信息添加到数据库中
            await User.create({
                username: fields.username,
                email: fields.email,
                password: fields.password,
                avatar: avatarPath,
                role: fields.role,
                state: fields.state
            });
            // 将页面重定向到用户登陆页面
            res.redirect('/admin/login');
        } else {
            return next(JSON.stringify({ path: '/home/register', message: '两次密码输入不一致' }));
        }
    });

};