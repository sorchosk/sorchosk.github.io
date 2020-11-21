'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('scripts', function () {
  return gulp.src('./src/js/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./build'))
})
 
gulp.task('default', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/js/*.js', gulp.series('scripts'));
});
