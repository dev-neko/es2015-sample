import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import ifElse from 'gulp-if-else';
import del from 'del';
import browserSync from 'browser-sync';
import browserify  from 'browserify';
import babelify    from 'babelify';

import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

const $ = gulpLoadPlugins();

const PATH = {
  DEST: './dest'
};

const srcJs  = ['./src/**/*.js'];
const srcViews = ['./src/**/*.pug', '!./src/**/_*.pug'];
const srcStyles = ['./src/**/*.s[ac]ss'];

const destFiles = [`${PATH.DEST}/**/*.html`,  `${PATH.DEST}/**/*.css`, `${PATH.DEST}/**/*.js*`];

const sync = browserSync.create();
const bundler = browserify('src/app.js');

bundler.transform(babelify.configure({
  sourceMapRelative: 'src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    .on('error',  (error) => {
      console.error('\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', $.uglify))
    .pipe(gulp.dest(PATH.DEST))
    ;
}

gulp.task('bundle', () => bundle());

gulp.task('transpile', ['lint'], () => bundle());
//gulp.task('transpile', ['lint'], () => {
//  return gulp.src(srcJs)
//    .pipe($.plumber())
//    .pipe($.sourcemaps.init())
//    .pipe($.babel())
//    .pipe($.sourcemaps.write('.'))
//    .pipe(gulp.dest(PATH.DEST));
//});

gulp.task('lint', () => {
  const lintTargets = [...srcJs, 'gulpfile.babel.js'];
  return gulp.src(lintTargets)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.plumber.stop());
});

gulp.task('clean', (cb) => {
  del(destFiles, cb);
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

gulp.task('serve',       ['transpile'], () => sync.init({ server: './dest' }));
gulp.task('js-watch',    ['transpile'], () => sync.reload());
gulp.task('views-watch', ['views'], () => sync.reload());
gulp.task('sass-watch',  ['sass'],  () => sync.reload());

gulp.task('watch', ['serve'] ,() => {
  gulp.watch(srcJs,     ['js-watch']);
  gulp.watch(srcViews,  ['views-watch']);
  gulp.watch(srcStyles, ['sass-watch']);
});


gulp.task('default', ['clean', 'transpile', 'views', 'sass']);
