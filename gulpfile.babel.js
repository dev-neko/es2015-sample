//const gulp = require('gulp');
//const $    = require('gulp-load-plugins')();

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import browserSync from 'browser-sync';
const $ = gulpLoadPlugins();

const PATH = {
  DEST: './dest'
};

const src  = ['./src/**/*.js'];
const srcViews = ['./src/**/*.pug', '!./src/**/_*.pug'];
const srcStyles = ['./src/**/*.s[ac]ss'];

const destFiles = [`${PATH.DEST}/**/*.html`,  `${PATH.DEST}/**/*.css`, `${PATH.DEST}/**/*.js*`];

const sync = browserSync.create();

gulp.task('clean', (cb) => {
  del(destFiles, cb);
});

gulp.task('build', ['lint'], () => {
  return gulp.src(src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(PATH.DEST));
});


gulp.task('lint', () => {
  return gulp.src(src)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.plumber.stop());
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

gulp.task('serve',       ['build'], () => sync.init({ server: './dest' }));
gulp.task('js-watch',    ['build'], () => sync.reload());
gulp.task('views-watch', ['views'], () => sync.reload());
gulp.task('sass-watch',  ['sass'],  () => sync.reload());

gulp.task('watch', ['serve'] ,() => {
  gulp.watch(src,       ['js-watch']);
  gulp.watch(srcViews,  ['views-watch']);
  gulp.watch(srcStyles, ['sass-watch']);
});


gulp.task('default', ['lint', 'clean', 'build', 'views', 'sass']);
