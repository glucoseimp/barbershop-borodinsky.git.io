'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {

  return function() {

    return gulp.src(options.src, {since: gulp.lastRun('symbols:assets')})
        .pipe($.svgmin())
        .pipe($.svgstore({
          inlineSvg:true
        }))
        .pipe($.rename('symbols.svg'))
        .pipe(gulp.dest(options.dst));
      };
};