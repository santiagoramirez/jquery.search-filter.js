var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var minify = require('gulp-minify');

var errorCallback = function (error) {
  console.log(error);
  this.emit('end');
};

gulp.task('js', function () {
    var src = [
        'jquery.search-filter.js',
    ];
    return gulp.src(src)
        .pipe(plumber({
            errorHandler: errorCallback
        }))
        .pipe(minify({
            ext:{
                src : '.js',
                min : '.min.js'
            },
            preserveComments : 'some',
        }))
        .pipe(gulp.dest(''))
});

gulp.task('watch', function () {
    gulp.watch('jquery.search-filter.js', ['js']);
});
