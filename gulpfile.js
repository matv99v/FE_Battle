var gulp = require('gulp');
var del = require('del');
var gulpConcatCss = require('gulp-concat-css');

var distPath = 'dist';

gulp.task('clean', function () {
    return del(distPath);
});

gulp.task('concat-blocks', ['clean'], function () {
    return gulp.src('blocks/**/*.css')
        .pipe(gulpConcatCss('blocks.min.css'))
        .pipe(gulp.dest(distPath + '/blocks'))
});

gulp.task('default', ['clean', 'concat-blocks'], function () {
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
