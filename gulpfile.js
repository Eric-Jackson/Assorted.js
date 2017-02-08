const gulp = require('gulp'),
      rollup = require('rollup-stream'),
      typescript = require('rollup-plugin-typescript'),
      babel = require("rollup-plugin-babel"),
      uglify = require('rollup-plugin-uglify'),
      source = require('vinyl-source-stream');

gulp.task('default', ['watch']);

gulp.task('ts', () => {
  return rollup({
    entry: './source/ts/assorted.ts',
    format: 'iife',
    moduleName: 'Assorted',
    plugins: [
      typescript(),
      babel({
        exclude: 'node_modules/**',
      }),
      // uglify()
    ]
  }).pipe(source('assorted.js'))
  .pipe(gulp.dest('./dist/js'))
});

gulp.task('watch', () => {
  gulp.watch(['source/ts/*.ts', 'source/ts/lib/*.ts'], ['ts']);
});