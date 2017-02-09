const gulp = require('gulp'),
      rollup = require('rollup-stream'),
      babel = require("rollup-plugin-babel"),
      uglify = require('rollup-plugin-uglify'),
      source = require('vinyl-source-stream');

gulp.task('default', ['watch']);

gulp.task('js', () => {
  return rollup({
    entry: './source/js/assorted.js',
    format: 'iife',
    moduleName: 'Assorted',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }).pipe(source('assorted.js'))
  .pipe(gulp.dest('./dist/js'))
});

gulp.task('js:production', () => {
  return rollup({
    entry: './source/js/assorted.js',
    format: 'iife',
    moduleName: 'Assorted',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ]
  }).pipe(source('assorted.min.js'))
  .pipe(gulp.dest('./dist/js'))
});

gulp.task('watch', () => {
  gulp.watch('source/js/*.js', ['js', 'js:production']);
});