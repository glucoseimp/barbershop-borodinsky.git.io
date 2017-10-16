'use strict';

const gulp = require('gulp');


function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
};
lazyRequireTask('styles', './tasks/styles.js', {
  src: 'sources/styles/style.scss',
  dst: 'build/css'
})

lazyRequireTask('clean', './tasks/clean', {
  dst: 'build'
});

lazyRequireTask('img:assets', './tasks/img', {
  src: 'sources/assets/**/*.{png,jpg,svg}',
  dst: 'build'
});

lazyRequireTask('symbols:assets', './tasks/symbols', {
  src: 'sources/assets/img/icons/*.svg',
  dst: 'build/img'
});


lazyRequireTask('assets', './tasks/assets', {
  src: 'sources/assets/**/*.{woff,woff2,html}',
  dst: 'build'
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'img:assets', 'symbols:assets', 'assets')));

gulp.task('watch', function() {
  gulp.watch('sources/styles/**/*.*', gulp.series('styles'));

  gulp.watch('sources/assets/**/*.*', gulp.series('assets'));

  gulp.watch('sources/assets/**/*.{png,jpg,svg}', gulp.series('img:assets'));

  gulp.watch('sources/assets/**/*.svg', gulp.series('symbols:assets'));
});

lazyRequireTask('serve', './tasks/serve', {
  src: 'build'
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
