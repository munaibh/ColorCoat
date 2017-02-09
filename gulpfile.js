// Import Gulp Modules.
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    sass   = require('gulp-sass'),
    connect = require('gulp-connect');

// Declaring Variables.
var env, outDir, jsSrc, htmlSrc, sassSrc;

env = process.env.NODE_ENV || 'dev';

// Creating Gulp Tasks.
gulp.task('js', function() {
  gulp.src(['app/public/scripts/*.js', '!app/public/scripts/*.min.js'])
    .pipe(concat('script.min.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', gulp.dest('app/public/scripts/')))
    .pipe(gulpif(env === 'prod', gulp.dest('dist/public/scripts/')))
    .pipe(connect.reload())

});

gulp.task('sass', function () {
  gulp.src('app/public/css/style.scss')
   .pipe(sass({
     outputStyle: 'expanded'
   }).on('error', sass.logError))
   .pipe(gulpif(env === 'prod', cleanCSS()))
   .pipe(gulpif(env === 'dev', gulp.dest('app/public/css/')))
   .pipe(gulpif(env === 'prod', gulp.dest('dist/public/css/')))
   .pipe(connect.reload())

});


gulp.task('html', function() {
  gulp.src('app/views/**/*.ejs')
  .pipe(gulpif(env === 'prod', gulp.dest('dist/views/')))
  .pipe(connect.reload())
});


gulp.task('routes', function() {
  gulp.src('app/routes/**/*.js')
  .pipe(gulpif(env === 'prod', gulp.dest('dist/routes/')))
});

// Watch Files.
gulp.task('watch', function() {
  gulp.watch(['app/public/scripts/*.js', '!app/public/scripts/*.min.js'], ['js']);
  gulp.watch('app/public/css/*.scss', ['sass']);
  gulp.watch('app/public/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});


gulp.task('default', ['js', 'sass', 'routes', 'html', 'connect', 'watch']);
