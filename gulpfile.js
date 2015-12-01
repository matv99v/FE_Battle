var gulp = require('gulp');

gulp.task('default', function () {
    return gulp.src([
        './*/**',
        '!font-awesome/**/*',
        '!font-awesome',
        '!node_modules/**/*',
        '!node_modules',
        '!bower_components/**/*',
        '!bower_components'
    ]).pipe(gulp.dest('dist'));
});