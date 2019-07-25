var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const terser = require('gulp-terser');

gulp.task('js', function() {
  return gulp.src(['static/js/src/*.js'])
    .pipe(concat('custom.bundle.js'))
    .pipe(terser())
    .pipe(gulp.dest('static/js/dist'));
});

gulp.task('js-third-party', function() {
  return gulp.src(['themes/renekann.de/static/js/jquery/*.js', 'themes/renekann.de/static/js/*.js', 'node_modules/typed.js/lib/typed.js'])
    .pipe(concat('libs.bundle.js'))
    .pipe(terser())
    .pipe(gulp.dest('static/js/dist'));
});

gulp.task('css', function() {
  return gulp.src(['static/css/src/*.css', 'themes/renekann.de/static/css/*.css'])
    .pipe(concat('styles.bundle.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('static/css/dist'));
});

gulp.task('sass', function() {
  return gulp.src('themes/renekann.de/static/css/style.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('themes/renekann.de/static/css'));
});

gulp.task('watch', function() {
  gulp.watch('themes/renekann.de/static/css/*.scss', gulp.series('sass', 'css'));
  gulp.watch(['static/js/src/*.js'], gulp.series('js'));
  gulp.watch(['themes/renekann.de/static/js/*.js'], gulp.series('js-third-party'));
});

gulp.task('default', gulp.series('sass', 'js', 'js-third-party', 'css', 'watch'));