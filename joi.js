// 引入joi模块 (14.3.1版本)
const Joi = require('joi');

// 定义验证规则
const schema = {
    // 必须是字符串类型 (最少2个字符最大14个字符)
    username: Joi.string().min(2).max(14).required().error(new Error('用户名不符合验证要求!')),

};

// 测试验证 
// (Joi.validate方法经百度只能在旧版的joi 新版本已弃用该方法)
async function runTest() {
    try {
        // 实施验证
        await Joi.validate({ username: '12312' }, schema);
    } catch (e) {
        console.log(e.message);
        return;
    }
    console.log('验证该用户名符合规则!');
}
runTest();