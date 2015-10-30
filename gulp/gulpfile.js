// packages
var gulp           = require('gulp'),
    notify         = require('gulp-notify'),
    concat 		   = require('gulp-concat'),
    browserSync    = require('browser-sync'), 
    sass 		   = require('gulp-sass'),
    plumber        = require('gulp-plumber'),
    uglify         = require('gulp-uglify')
    path           = require('path'),
    sourcemaps 	   = require('gulp-sourcemaps'),
    //bourbon 	   = require('node-bourbon'),
    gulpif 		   = require('gulp-if'),
    argv 		   = require('yargs').argv,
    uncss 		   = require('gulp-uncss'),

    url 		   = "http://labs.dev",

    reload         = browserSync.reload;

// paths
var path = {
        src: "../src",
        dist: "../public",
        bower: '../bower_components',
        icons: path.join(__dirname, "node_modules/gulp-notify/node_modules/node-notifier/node_modules/growly/example/")
};

// Error Handler
var plumberErrorHandler = { errorHandler: notify.onError({
        title: "SASS ERROR",
        message: "Error: <%= error.message %>",
        icon: path.icons + "muffin.png",
    })
};

// Browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        proxy: url
    });
});

// Javascript
gulp.task('js', function() {
    var main = [path.bower + '/angular/angular.js', path.bower + '/bootstrap/src/*.js', path.bower + '/react/react-with-addons.js'];
    return gulp.src(main)
        .pipe(gulpif(argv.production, uglify()))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.dist + '/js'));
});
 
// Sass
gulp.task('sass', function() {
  gulp.src(path.src + '/sass/*.scss')
    .pipe(plumber(plumberErrorHandler))
	.pipe(sourcemaps.init())
    .pipe(sass({
    	//includePaths: bourbon.includePaths
    }))
	.pipe(sourcemaps.write())
	.pipe(concat('main.css'))
    .pipe(gulpif(argv.production, uncss({
        html: [url]
    })))
	.pipe(gulp.dest(path.dist + '/css'))
    .pipe(reload({stream: true}));
});

// Default task
gulp.task('default', ['browser-sync', 'js', 'sass'], function () {
    gulp.watch(path.bower + "/**/*.js", ['js', browserSync.reload]);
    gulp.watch(path.src + "/sass/**/*.scss", ['sass']);
});