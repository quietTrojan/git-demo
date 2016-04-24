var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    styleInject = require("gulp-style-inject");
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
//定义一个testLess任务（自定义任务名称）
/*gulp.task('less_css', function () {
    return gulp.src(['src/less/!*.less','!src/less/reuseClass.less']) //该任务针对的文件
        .pipe(less())
        .pipe(gulp.dest('dist/css/')); //将会在src/css下生成index.css
    console.log('less编译',new Date().getTime());
});*/

gulp.task('sass_css', function () {
    return gulp.src(['src/sass/*.scss']) //该任务针对的文件
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/')); //将会在src/css下生成index.css
    console.log('sass编译',new Date().getTime());
});

gulp.task('imagemin', function(){
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['sass_css']);
//gulp.task('default', ['concat_js','less_css','file_include']);

 /*gulp.task('styleInject',['less_css'],function () {
    gulp.src(['src/htmlTemplate/404.html'])
        .pipe(styleInject())
        .pipe(gulp.dest("build/"));
});*/

gulp.task('watch', function () {
    var watcher = gulp.watch(['src/**/*',], ['default']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
