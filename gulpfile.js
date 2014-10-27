var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlReplace = require('gulp-html-replace');

var dest = 'dist/';

gulp.task('lint', function() {
  return gulp
    .src('app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean-dist', function(cb) {
  //del(['dist/**']);         // Should use this if gulp-html-replace works
  del(['dist/js/**']);
  cb();
});

gulp.task('concat', ['clean-dist'], function(cb) {
  return gulp
    .src([
      'bower_components/d3/d3.min.js',
      'bower_components/underscore/underscore.js',
      'app/tetromino.js',
      'app/piece-square.js',
      'app/piece-tblock.js',
      'app/piece-rightl.js',
      'app/piece-leftl.js',
      'app/piece-straight.js',
      'app/piece-sblock.js',
      'app/piece-zblock.js',
      'app/field.js',
      'app/app.js'
    ])
    .pipe(concat('production.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify', ['concat'], function() {
  return gulp
    .src('dist/js/production.js')
    .pipe(uglify())
    .pipe(rename('production.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// this is broken - produces a blank index.html
// gulp.task('html', ['minify'], function() {
//   return gulp
//     .src('index.html')
//     .pipe(htmlReplace({
//       js: 'js/production.min.js'
//     }))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('build', ['concat', 'minify']);

gulp.task('default', function() {
  // place code for your default task here
});
