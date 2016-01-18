'use strict';
var ngConstant = require('gulp-ng-constant');
var gulp = require('gulp');

gulp.task('config', function () {
  gulp.src('app/config.json')
    .pipe(ngConstant())
    // Writes config.js to dist/ folder
    .pipe(gulp.dest('dist'));
});