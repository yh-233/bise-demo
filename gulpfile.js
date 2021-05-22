var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('default', function() {
    return gulp.src('./public/home/css/article.css', { allowEmpty: true })
        .pipe(uncss({
            html: ['http://localhost:3000/home/article.html']
        }))
        .pipe(gulp.dest('./public/home/css'));
});