var gulp = require('gulp');
var del = require('del');
var gulpMinifyCss = require('gulp-minify-css');
var rebase = require('gulp-css-url-rebase');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var minifyInline = require('gulp-minify-inline');
var minifyHTML = require('gulp-minify-html');

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

gulp.task('default', ['clean', 'usemin', 'minify-inline', 'minify-html'], function () {
    return gulp.src([
        './**/*',
        '!package.json',
        '!gulpfile.js',
        '!index.html',
        '!blocks/**/*.css',
        '!css/**/*',
        '!css',
        '!font-awesome/{css,less,scss}/*',
        '!node_modules/**/*',
        '!node_modules',
        '!bower_components/**/*',
        '!bower_components'
    ]).pipe(gulp.dest(distPath));
});

gulp.task('minify-inline', ['minify-html'], function() {
    gulp.src(distPath + '/index.html')
        .pipe(minifyInline())
        .pipe(gulp.dest(distPath))
});



gulp.task('minify-html', ['usemin'], function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    return gulp.src(distPath + '/index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(distPath));
});


gulp.task('usemin', ['clean'], function() {
  return gulp.src('index.html')
    .pipe(usemin({
      css: [ rebase, 'concat', gulpMinifyCss, rev ],
      js: [ uglify ]
    }))
    .pipe(gulp.dest(distPath));
});
