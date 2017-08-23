var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver');

var concat = require('gulp-concat-util');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('scripts', function() {
    gulp.src([
        './app/bower_components/angular/angular.js',
        './app/bower_components/jquery/dist/jquery.min.js',
        './app/bower_components/bootstrap/dist/js/bootstrap.min.js',
        './app/js/app.js',
        './app/js/controller/paypalCalculatorCtrl.js'
    ])
        .pipe(concat.scripts('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./deploy/app/dist/'))
});

gulp.task('copy', function() {
    gulp.src(['./app/css/*'])
        .pipe(gulp.dest('./deploy/app/css/'))
    gulp.src(['./app/bower_components/**/*'])
        .pipe(gulp.dest('./deploy/app/bower_components/'))
    gulp.src(['./app/index.html'])
        .pipe(rename("index2.html"))
        .pipe(gulp.dest('./deploy/app/'))
});

gulp.task('js', function() {
    gulp.src('app/js/**/*')
});

gulp.task('html', function() {
    gulp.src('app/*.html')
});

gulp.task('css', function() {
    gulp.src('app/css/*.css')
});

gulp.task('watch', function() {
    gulp.watch('app/js/**/*', ['js']);
    gulp.watch('app/css/*.css', ['css']);
    gulp.watch(['app/*.html',
        'app/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
    gulp.src('app/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 5836
        }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);

gulp.task('deploy', ['scripts', 'copy']);
