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
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var critical = require('critical').stream;

var distPath = 'dist';

gulp.task('build', ['copy', 'usemin', 'minify-inline', 'minify-html', 'image-min', 'critical']);

gulp.task('minify-blocks', ['clean'], function () {
    return gulp.src('blocks/**/*.css')
        .pipe(rebase())
        .pipe(concat('blocks.min.css'))
        .pipe(gulpMinifyCss())
        .pipe(gulp.dest(distPath))
});

gulp.task('copy', ['clean'], function () {
    return gulp.src([
        './**/*',
        '!package.json',
        '!gulpfile.js',
        '!index.html',
        '!blocks/**/*.css',
        '!blocks/**/*.{png,jpg,jpeg}',
        '!css/**/*',
        '!css',
        '!img/**/*.{png,jpg,jpeg}',
        '!font-awesome/{css,less,scss}/*',
        '!node_modules/**/*',
        '!node_modules',
        '!bower_components/**/*',
        '!bower_components'
    ]).pipe(gulp.dest(distPath));
});

gulp.task('clean', function () {
    return del(distPath);
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

gulp.task('image-min', ['image-min:img', 'image-min:blocks']);

gulp.task('image-min:img', ['clean'], function () {
    return gulp.src([
            'img/**/*.{png,jpg,jpeg}'
        ])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(distPath + '/img'));
});

gulp.task('image-min:blocks', ['clean'], function () {

    return gulp.src([
            'blocks/**/*.{png,jpg,jpeg}'
        ])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(distPath + '/blocks'));
});


gulp.task('usemin', ['clean'], function() {
  return gulp.src('index.html')
    .pipe(usemin({
      css: [ rebase, 'concat', gulpMinifyCss, rev ],
      js: [ uglify ]
    }))
    .pipe(gulp.dest(distPath));
});

gulp.task('critical', ['copy'], function () {
    return gulp.src(distPath + '/index.html')
        .pipe(critical({base: distPath, inline: true}))
        .pipe(gulp.dest(distPath));
});
