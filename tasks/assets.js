'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const html = function(file) {
              return file.extname == '.html'
            }

module.exports = function(options) {

  return function() {

    return gulp.src(options.src, {since: gulp.lastRun('assets')})
        .pipe(gulp.dest(options.dst))
        .pipe($.if(html, $.htmlmin({collapseWhitespace: true})))
        .pipe($.if(html, $.rename({
            suffix: '.min'
         })))
        .pipe(gulp.dest(options.dst))
      };
};