var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var jsonMinify = require('gulp-json-minify');
var gulpCopy = require('gulp-copy');
var ngAnnotate = require('gulp-ng-annotate');
var htmlreplace = require('gulp-html-replace');

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
        'public/vendor/angular-translate/angular-translate.min.js',
        'public/vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        'public/vendor/angular-bootstrap/ui-bootstrap.min.js',
        'public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/vendor/angular-filter/dist/angular-filter.min.js',
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
        'public/vendor/font-awesome/css/font-awesome.min.css'
    ];

    return gulp.src(sources)
        .pipe(cleanCSS())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/public/css'));
});

gulp.task('jsonMinify', function() {
    return gulp.src('public/translations/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('dist/public/translations'));
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

gulp.task('default', function(callBack) {
    return runSequence('clean', ['uglify', 'htmlmin', 'cssmin', 'jsonMinify', 'copyFontAwesome', 'copyFontOw', 'copyResources', 'copyProject', 'htmlreplace'], callBack);
});