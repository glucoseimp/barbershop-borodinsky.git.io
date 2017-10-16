'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

module.exports = function(options) {

  return function() {

    return gulp.src(options.src)
      .pipe($.sourcemaps.init())
      .pipe($.sass())
      .on('error', $.notify.onError())
      .pipe($.postcss([
        autoprefixer({browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
          ]}),
        mqpacker({
          sort: true
        })
      ]))
      .pipe(gulp.dest(options.dst))
      .pipe($.csso())
      .pipe($.rename({
        suffix: '.min'
      }))      
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.dst))
    };
};
