var gulp           = require('gulp'),
    concat 		   = require('gulp-concat'),
    browserSync    = require('browser-sync'), 
    sass 		   = require('gulp-sass'),
    path           = require('path'),
    sourcemaps 	   = require('gulp-sourcemaps'),
    gulpif 		   = require('gulp-if'),
    argv 		   = require('yargs').argv,
    uncss 		   = require('gulp-uncss'),
    url 		   = "http://project.dev",
    reload         = browserSync.reload;

var path = {
    src: "../src",
    dist: "../public",
    bower: '../bower_components'
};

gulp.task('browser-sync', function() {
    browserSync({
        proxy: url
    });
});

gulp.task('js', function() {
    var main = [path.bower + '/angular/angular.js', path.bower + '/bootstrap/src/*.js', path.bower + '/react/react-with-addons.js'];
    return gulp.src(main)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.dist + '/js'));
});

gulp.task('sass', function() {
  gulp.src(path.src + '/sass/*.scss')
	.pipe(sourcemaps.init())
    .pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(concat('main.css'))
	.pipe(gulp.dest(path.dist + '/css'))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['browser-sync', 'js', 'sass'], function () {
    gulp.watch(path.bower + "/**/*.js", ['js', browserSync.reload]);
    gulp.watch(path.src + "/sass/**/*.scss", ['sass']);
});