
var gulp = require("gulp");
// require file
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var watch = require('gulp-watch')

gulp.task('stylus', function() {
  console.log("stylus compile");
  gulp.src('src/stylus/*')
  .pipe(stylus().on('error', function(){console.log('compile error')}))
  .pipe(gulp.dest('dist/css'));
});
 
gulp.task('pug', function() {
  console.log("pug compile");
  gulp.src('src/pug/*')
  .pipe(pug({
      pretty: true
    }).on('error',function(){console.log('compile error')}))
    .pipe(gulp.dest('dist/'));
});

gulp.task("watch", function () {
    gulp.watch("src/stylus/*", ["stylus"]);
    gulp.watch("src/pug/*", ["pug"]);
})

gulp.task('default', ['watch']);
