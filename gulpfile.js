var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var gulpCopy = require('gulp-copy');
var ngAnnotate = require('gulp-ng-annotate');
var htmlreplace = require('gulp-html-replace');
var gulpNgConfig = require('gulp-ng-config');

gulp.task('clean', function () {
	return gulp.src('dist')
	    .pipe(clean());
});

gulp.task('uglify', function() {
    var sources = [
        'public/vendor/jquery/dist/jquery.min.js',
        'public/vendor/bootstrap/dist/js/bootstrap.min.js',
        'public/vendor/angular/angular.min.js',
        'public/vendor/angular-ui-router/release/angular-ui-router.min.js',
        'public/vendor/angular-bootstrap/ui-bootstrap.min.js',
        'public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/vendor/angular-local-storage/dist/angular-local-storage.min.js',
        'public/vendor/angular-confirm/dist/angular-confirm.min.js',
        'public/vendor/angular-input-masks/angular-input-masks-standalone.min.js',
        'public/vendor/ng-focus-if/focusIf.min.js',
        'public/js/**/*.js'
        ];

    return gulp.src(sources)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/public/js'));
});

gulp.task('htmlreplace', function() {
    return gulp.src('public/index.html')
        .pipe(htmlreplace({
            'css' : 'css/styles.min.css',
            'js': 'js/all.min.js'
        }))
        .pipe(gulp.dest('dist/public'));
});

gulp.task('htmlmin', function() {
    var htmlminOptions = {
        removeComments: true,
        collapseWhitespace: true
    };

    return gulp.src('public/partials/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/public/partials'));
});

gulp.task('cssmin', function() {
    var sources = [
        'public/vendor/bootstrap/dist/css/bootstrap.min.css',
        'public/vendor/bootstrap/dist/css/bootstrap-theme.min.css',
        'public/resources/css/style.css',
        'public/resources/css/owfont-regular.min.css',
        'public/vendor/font-awesome/css/font-awesome.min.css',
        'public/vendor/angular-confirm/dist/angular-confirm.min.css'
    ];

    return gulp.src(sources)
        .pipe(cleanCSS())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/public/css'));
});

gulp.task('copyFontAwesome', function() {
    return gulp.src('public/vendor/font-awesome/fonts/**/*')
        .pipe(gulp.dest('dist/public/font-awesome/fonts'));
});

gulp.task('copyFontOw', function() {
    return gulp.src('public/resources/fonts/**/*')
        .pipe(gulp.dest('dist/public/fonts'));
});

gulp.task('copyResources', function() {
    var sources = [
        'public/resources/*.png',
        'public/resources/*.ico'
    ];

    return gulp.src(sources)
        .pipe(gulp.dest('dist/public/resources'));
});

gulp.task('copyProject', function() {
    var sources = [
        'public/favicon.ico',
        'node_modules/**',
        '.bowerrc',
        '.gitignore',
        'bower.json',
        'gulpfile.js',
        '.travis.yml',
        'README.md',
        'package.json'
    ];

    return gulp.src(sources)
        .pipe(gulpCopy('dist', { prefix: 0 }));
});

gulp.task('configenv', function () {
  gulp.src('public/js/config/environmentConfig.json')
  .pipe(gulpNgConfig('cloudapi', {
      environment: 'env.production',
    //   environment: 'env.development',
      createModule: false
  }))
  .pipe(gulp.dest('public/js/config'))
});

gulp.task('default', function(callBack) {
    return runSequence('clean', ['configenv', 'uglify', 'htmlmin', 'cssmin', 'copyFontAwesome', 'copyFontOw', 'copyResources', 'copyProject', 'htmlreplace'], callBack);
});