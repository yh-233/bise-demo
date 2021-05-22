//引入mongoose第三方模块
const mongoose = require('mongoose');

//避免报错
mongoose.set('useCreateIndex', true);

// 连接数据库
mongoose.connect('mongodb://localhost/test-demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('连接数据库成功'))
    .catch(err => console.log(err, '连接数据库失败'));