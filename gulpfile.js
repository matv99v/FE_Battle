var gulp = require('gulp');
var del = require('del');

var distPath = 'dist';

gulp.task('clean', function () {
    return del(distPath);
});

gulp.task('default', ['clean'], function () {
    return gulp.src([
        './*/**',
        '!font-awesome/**/*',
        '!font-awesome',
        '!node_modules/**/*',
        '!node_modules',
        '!bower_components/**/*',
        '!bower_components'
    ]).pipe(gulp.dest(distPath));
});