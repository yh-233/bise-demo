//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');

//引入bcrypt 
const bcrypt = require('bcrypt');

// 引入joi模块 (14.3.1版本)
const Joi = require('joi');

// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        defualt: 'normal',
        required: true
    },
    // 0表示启用状态
    // 1表示冻结状态
    state: {
        type: Number,
        defualt: 0
    }
});

// 创建集合
const User = mongoose.model('User', userSchema);

//创建用户
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'admin',
        email: 'yh233@yh.com',
        password: pass,
        role: 'admin',
        state: 0
    });
}
// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证要求!')),
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required().error(new Error('密码不符合验证要求!')),
        avatar: Joi.string().empty([null, ""]).default(""),
        role: Joi.string().valid('admin', 'normal').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    // 测试验证 
    return Joi.validate(user, schema);
}

//将用户集合作为模块成员导出
module.exports = {
    User,
    validateUser
}