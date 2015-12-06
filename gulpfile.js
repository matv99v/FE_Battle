var gulp = require('gulp');
var del = require('del');
var gulpMinifyCss = require('gulp-minify-css');
var rebase = require('gulp-css-url-rebase');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');

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

gulp.task('default', ['clean', 'usemin'], function () {
    return gulp.src([
        './**',
        '!package.json',
        '!gulpfile.js',
        '!index.html',
        '!blocks/**/*.css',
        '!font-awesome/**/*',
        '!font-awesome',
        '!node_modules/**/*',
        '!node_modules',
        '!bower_components/**/*',
        '!bower_components'
    ]).pipe(gulp.dest(distPath));
});

gulp.task('usemin', ['clean'], function() {
  return gulp.src('index.html')
    .pipe(usemin({
      css: [ rebase, 'concat', gulpMinifyCss, rev ],
      js: []
    }))
    .pipe(gulp.dest(distPath));
});
