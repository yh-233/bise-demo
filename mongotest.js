// 连接数据库
mongoose.connect('mongodb://localhost/test-demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('连接数据库成功'))
    .catch(err => console.log(err, '连接数据库失败'));


// 设置集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    year: Number,
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

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
// Course.find().then(res => console.log(res));
// // 返回的是数组
// Course.find({ _id: '6042db3fc1b5661818a59258' }).then(res => console.log(res));
// // 返回的是一个文档(对象)
// Course.findOne({ author: 'yh1' }).then(res => console.log(res));
// // 匹配包含year大于2011小于2020的文档(返回数组)
// Course.find({ year: { $gt: 2011, $lt: 2020 } }).then(res => console.log(res));
// // 匹配包含author里面有yh字段的文档(返回数组)
// Course.find({ author: { $in: ['yh'] } }).then(res => console.log(res));
// // 选择要查询的字段(name author)排除_id字段
// Course.find().select('name author -_id').then(res => console.log(res));
// // 根据year进行升序排列
// Course.find().sort('year').then(res => console.log(res));
// // skip跳过几条数据,limit限制查询数量
// Course.find().skip(1).limit(1).then(res => console.log(res));

// 从数据库删除文档
// 返回删除的文档
// 如匹配多个删除第一个
Course.findOneAndDelete({ _id: '6042e10db387e01984e400e6' }).then(res => console.log(res))
    // 删除多个
Course.deleteMany({ author: yh }).then(res => console.log(res))

// 更新文档
// 更新单个文档
Course.updateOne({ author: yh1 }, { author: yh }).then(res => console.log(res))
    // 更新多个文档
Course.updateMany({}, { author: yh }).then(res => console.log(res))

// 字符串验证
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请输入文章标题'],
        minlength: [2, '文章标题不能小于2'], // 针对字符串
        maxlength: [5, '文章标题不能大于5'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, '请输入年龄'],
        min: [18, '不符合年龄'], // 针对数值
        max: [60, '超过年龄'],
        trim: true
    },
    publishDate: {
        type: Date,
        default: Date.now //当前时间
    },
    category: {
        type: String,
        enum: {
            values: ['html', 'css', 'javascript', 'node.js'],
            message: '分类名称要在一定的范围内才可以'
        }
    },
    author: {
        type: String,
        validate: {
            validator: v => {
                // 返回布尔值
                // v 要验证的值
                return v && v.length >= 2
            },
            // 自定义错误信息
            message: '传入的值不符合验证规则'
        }
    }
});
const Post = mongoose.model('Post', postSchema);
Post.create({
    title: '第二篇文章',
    age: 18,
    category: 'html',
    author: 'yh'
}).then(res => console.log(res)).catch(error => {
    const err = error.errors;
    for (let arr in err) {
        console.log(err[arr]['message']);
    }
})