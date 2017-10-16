'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const svg = function(file) {
              return file.extname == '.svg'
            }

module.exports = function(options) {

  return function() {

    return gulp.src(options.src, {since: gulp.lastRun('img:assets')})
        .pipe($.if(svg, $.svgmin(),
                        $.imagemin([
                          $.imagemin.optipng({optimizationLevel:3}),
                          $.imagemin.jpegtran({progressive:true})
                        ])))
        .pipe(gulp.dest(options.dst));
      };
};