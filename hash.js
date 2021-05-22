/*
 * (安装python2.7.10 .NET4.6.2版本 windows-bulid-tools4.00版本
 * 安装node-gpy)才可以安装bcrypt这个模块
 */

// 导入bcrypt 
const bcrypt = require('bcrypt');

//必须放在异步函数中
async function run() {
    //生成随机字符串 (传参数值越大生成的越复杂 默认10)
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);

    // 对密码进行加密 (返回值是加密当密码)
    // console.log(await bcrypt.hash('123456', salt));
    const result = await bcrypt.hash('123456', salt);
}
run();