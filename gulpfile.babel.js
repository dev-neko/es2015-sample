//const gulp = require('gulp');
//const $    = require('gulp-load-plugins')();

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

const PATH = {
  DEST: './dest'
};

const src  = ['./src/**/*.js'];
const srcViews = ['./src/**/*.pug', '!./src/**/_*.pug'];
const srcStyles = ['./src/**/*.s[ac]ss'];

gulp.task('build', () => {
  return gulp.src(src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATH.DEST));
});

gulp.task('views', () => {
  return gulp.src(srcViews)
    .pipe($.plumber())
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest(PATH.DEST));
});

gulp.task('sass', () => {
  return gulp.src(srcStyles)
    .pipe($.plumber())
    .pipe($.sass({ 
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(PATH.DEST));
});

gulp.task('watch', () => {
  gulp.watch(src,      ['build']);
  gulp.watch(srcViews, ['views']);
  gulp.watch(srcStyles,['sass']);
});

gulp.task('default', ['build', 'views', 'sass']);
