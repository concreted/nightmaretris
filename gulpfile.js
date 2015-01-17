var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var browserSync = require('browser-sync');

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    files: "dist/**",          // Files to watch for changes
    server: {
      baseDir: "./",
    }
  });
});

var paths = {
  content_scripts: [
  'chrome/content/inject.js',
  ]
};

// Set entry point for Browserify.
// set fullPaths to false so bundle will not contain full filepaths
watchify.args.fullPaths = false;
var bundler = browserify('./app/app.js', watchify.args);

// Browserify bundle helper function.
// Calls browserify().bundle() with error logging and correct
// source + destination.
function bundle(b) {
  return b.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('app.js'))
  // optional, remove if you dont want sourcemaps
  //.pipe(buffer())
  //.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
  //.pipe(sourcemaps.write('./')) // writes .map file
  //
  .pipe(gulp.dest('./dist/js'));
};

gulp.task('lint', function() {
  return gulp
    .src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  var watcher = watchify(bundler);

  watcher.on('update', function(ids) {
    if (Array.isArray(ids)) {
      console.log('[Watchify] File changed: ' + ids);
    }
    return bundle(watcher);
  });
});

gulp.task('build', function() {
  bundle(bundler);
});

gulp.task('default', ['watch', 'browser-sync'], function() {
  // place code for your default task here
});
