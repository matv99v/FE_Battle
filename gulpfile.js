var gulp = require('gulp');
var del = require('del');
var gulpMinifyCss = require('gulp-minify-css');
var rebase = require('gulp-css-url-rebase');
var concat = require('gulp-concat');

var distPath = 'dist';

gulp.task('clean', function () {
    return del(distPath);
});

gulp.task('minify-blocks', ['clean'], function () {
    return gulp.src('blocks/**/*.css')
        .pipe(rebase())
        .pipe(concat('blocks.min.css'))
        .pipe(gulpMinifyCss())
        .pipe(gulp.dest(distPath))
});

gulp.task('default', ['clean', 'minify-blocks'], function () {
    return gulp.src([
        './**',
        '!package.json',
        '!gulpfile.js',
        '!blocks/**/*.css',
        '!font-awesome/**/*',
        '!font-awesome',
        '!node_modules/**/*',
        '!node_modules',
        '!bower_components/**/*',
        '!bower_components'
    ]).pipe(gulp.dest(distPath));
});
