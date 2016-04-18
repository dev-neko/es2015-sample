//const gulp = require('gulp');
//const $    = require('gulp-load-plugins')();

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

const src  = ['./src/*.js'];
const srcViews = ['./src/**/*.pug', '!./src/**/_*.pug'];

gulp.task('build', () => {
  return gulp.src(src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));
});

gulp.task('views', () => {
  return gulp.src(srcViews)
    .pipe($.plumber())
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest('./dest/'));
});

gulp.task('watch', () => {
  gulp.watch(src, ['build']);
});

gulp.task('default', ['build']);
