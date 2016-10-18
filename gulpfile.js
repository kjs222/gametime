// vim: set et sw=2 ts=2

// gulp.task('default', [ 'lint' ]);

var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./gametime/**/*")
    .pipe(deploy())
});
