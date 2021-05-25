var images = require("images");
var fs = require("fs");

var path = "/article-cover";
var outpath = "/compress/";


function compress(path) {
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('error:\n' + err);
            return;
        }

        files.forEach(function(file) {

            fs.stat(path + '/' + file, function(err, stat) {
                if (err) { console.log(err); return; }
                if (stat.isDirectory()) {
                    // 如果是文件夹遍历
                    compress(path + '/' + file);
                } else {

                    //遍历图片
                    console.log('文件名:' + path + '/' + file);
                    var name = path + '/' + file;
                    var outName = outpath + file

                    images(name).save(outName, {
                        quality: 60 //保存图片到文件,图片质量为50
                    });

                }
            });

        });

    });
}

compress(path)