// 引入node模块http
const http = require('http');
// 引入node模块url
// const url = require('url');
// 引入node模块fs
// const fs = require('fs');
// 引入node模块path
const path = require('path');
// 引入node第三方模块mime
// const mime = require('mime');
// 引入express模块
const express = require('express');
// 引入mongoose模块
const mongoose = require('mongoose');
// 引入body-parser模块 处理post请求参数
const bodyPaser = require('body-parser');
// 引入express-session模块
const session = require('express-session');
// 导入art-tampate引擎
const template = require('art-template');
// 引入dateformat模块
const dateFormat = require('dateformat');


// 设置端口
const port = 3000;

// 设置主机名
const hostname = 'localhost'

// 创建一个http服务器
const app = express();

//数据库连接
require('./model/connect');
// require('./model/user');

//处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));
// 配置session
app.use(session({
    secret: 'secret key',
    // resave: false, // 添加 resave 选项
    saveUninitialized: false, //添加 saveUninitialized 选项
    // secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC', // 建议使用 128 个字符的随机字符串
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// express框架模版所在位置
app.set('views', path.join(__dirname, 'views'));
// 模版默认后缀
app.set('view engine', 'art');
// 后缀为art的模版使用的引擎
app.engine('art', require('express-art-template'));
// 向模版内部导入dataformat变量
template.defaults.imports.dateFormat = dateFormat;

// 引入路由模块
const home = require('./route/home.js');
const admin = require('./route/admin.js');
const { nextTick } = require('process');

// 拦截请求 判断用户登陆状态
app.use('/admin', require('./meddleware/loginGuard'));

//为路由匹配路径
app.use('/', home);
app.use('/home', home);
app.use('/admin', admin);
app.use((err, req, res, next) => {
    // 将字符串转为对象
    // JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})




// 监听服务器
app.listen(port, () => {
    console.log(`服务器成功运行在http://${hostname}:${port}`);
});

// app.get('/responseData', (req, res) => {
//     res.send({
//         url: '/img/bg/80224060_p0.jpg',
//         title: '这是标题',
//         username: '张三',
//         style: '热门'
//     })
// });

// const httpServer = http.createServer();
// httpServer.on('request', (req, res) => {
//     let pathname = url.parse(req.url).pathname;
//     // 默认是index.html
//     pathname = pathname == '/' ? '/index.html' : pathname;
//     // 设置绝对路径
//     let _PATH = path.join(__dirname, 'public' + pathname);
//     // 获取属性
//     let type = mime.getType(_PATH);
//     // 读取文件
//     fs.readFile(_PATH, (e, r) => {
//         if (e) {
//             console.error(e);
//             res.writeHead(404, {
//                 'content-type': 'text/html;charset=utf8'
//             })
//             res.end('<h1>404 NOT FOUND!!!</h1>')
//             return;
//         } else {
//             // 让服务器当状态码200的时候响应的是html utf-8格式
//             res.writeHead(200, {
//                 'content-type': type
//             });
//             res.end(r);
//         }
//     });
// });





// 连接数据库
// mongoose.connect('mongodb://localhost/test-demo', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('连接数据库成功'))
//     .catch(err => console.log(err, '连接数据库失败'));


// 设置集合规则
// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     year: Number,
//     isPublished: Boolean
// });
// const Course = mongoose.model('Course', courseSchema);

/*
// 将文档插入到数据库中(2)
Course.create({
    name: 'test-demo2',
    author: 'yh',
    year: 2010,
    isPublished: true
}, (err, result) => {
    console.log(err)
    console.log(result);
})


// 使用规则创建集合
const course = new Course({
    name: 'test-demo',
    author: 'yh',
    isPublished: true
})

// 将文档插入到数据库中
course.save();

*/

// 从数据库查文档
// Course.find().then(res => console.log(res))
// 返回的是数组
// Course.find({ _id: '6042db3fc1b5661818a59258' }).then(res => console.log(res))
// 返回的是一个文档(对象)
// Course.findOne({ author: 'yh1' }).then(res => console.log(res))
// 匹配包含year大于2011小于2020的文档(返回数组)
// Course.find({ year: { $gt: 2011, $lt: 2020 } }).then(res => console.log(res));
// 匹配包含author里面有yh字段的文档(返回数组)
// Course.find({ author: { $in: ['yh'] } }).then(res => console.log(res));
// 选择要查询的字段(name author)排除_id字段
// Course.find().select('name author -_id').then(res => console.log(res));
// 根据year进行升序排列
// Course.find().sort('year').then(res => console.log(res));
// skip跳过几条数据,limit限制查询数量
// Course.find().skip(1).limit(1).then(res => console.log(res));

// 从数据库删除文档
// 返回删除的文档
// 如匹配多个删除第一个
// Course.findOneAndDelete({_id:6042e10db387e01984e400e6}).then(res => console.log(res))
// 删除多个
// Course.deleteMany({author:yh}).then(res=>console.log(res))

// 更新文档
// 更新单个文档
// Course.updateOne({author:yh1},{author:yh}).then(res=>console.log(res))
// 更新多个文档
// Course.updateMany({},{author:yh}).then(res=>console.log(res))

// 字符串验证
// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, '请输入文章标题'],
//         minlength: [2, '文章标题不能小于2'], // 针对字符串
//         maxlength: [5, '文章标题不能大于5'],
//         trim: true
//     },
//     age: {
//         type: Number,
//         required: [true, '请输入年龄'],
//         min: [18, '不符合年龄'], // 针对数值
//         max: [60, '超过年龄'],
//         trim: true
//     },
//     publishDate: {
//         type: Date,
//         default: Date.now //当前时间
//     },
//     category: {
//         type: String,
//         enum: {
//             values: ['html', 'css', 'javascript', 'node.js'],
//             message: '分类名称要在一定的范围内才可以'
//         }
//     },
//     author: {
//         type: String,
//         validate: {
//             validator: v => {
//                 // 返回布尔值
//                 // v 要验证的值
//                 return v && v.length >= 2
//             },
//             // 自定义错误信息
//             message: '传入的值不符合验证规则'
//         }
//     }
// });
// const Post = mongoose.model('Post', postSchema);
// Post.create({
//     title: '第二篇文章',
//     age: 18,
//     category: 'html',
//     author: 'yh'
// }).then(res => console.log(res)).catch(error => {
//     const err = error.errors;
//     for (let arr in err) {
//         console.log(err[arr]['message']);
//     }
// })