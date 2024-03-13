const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const cleanCSS = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');

gulp.task('clean', () => {
  return del([
    'public/js/main.js',
    'public/js/vendor.js',
    'public/css/main.css',
  ]); // Example: Clean the 'public' directory
});

gulp.task('sass', () => {
  return gulp.src('assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('public/css'))
    .on('end', function() {
      livereload.changed('main.css');
  })
});

gulp.task('watch', () => {
  livereload.listen(); // Start Livereload server
  gulp.watch('assets/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('vendorJS', () => {
  return gulp.src(['assets/js/vendors/jquery-3.7.1.min.js', 'assets/js/vendors/*.js'])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('public/js'))
})
gulp.task('customJS', () => {
  return gulp.src('assets/js/general.js')
  .pipe(concat('main.js'))
  .pipe(gulp.dest('public/js'))
})
// gulp.task('images', () => {
//   const imagemin = await import('gulp-imagemin');
//   return gulp.src('assets/images/*.!(db)')
//   .pipe(imagemin([
//     imagemin.gifsicle({ interlaced: true }),
//     imagemin.mozjpeg({ quality: 75, progressive: true }),
//     imagemin.optipng({ optimizationLevel: 5 }),
//     imagemin.svgo({
//       plugins: [
//         { removeViewBox: true },
//         { cleanupIDs: false }
//       ]
//     })
//   ]))
//   .pipe(gulp.dest('public/images'))
// })
async function minifyImages() {
  const imagemin = await import('gulp-imagemin');

  return gulp.src('assets/images/*.!(db)')
    .pipe(imagemin.default([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('public/images'));
}
gulp.task('build', function(cb) {
  gulp.series('clean', 'sass', 'vendorJS', 'customJS', minifyImages);
  cb()
});
gulp.task('default', gulp.series('build', function a(cb) {
  gulp.watch('assets/scss/**/*.scss', gulp.series('sass', 'watch'));
  gulp.watch('assets/js/vendors/*.js', gulp.series('vendorJS'));
  gulp.watch('assets/js/*.js', gulp.series('customJS'));
  gulp.watch('assets/images', gulp.series(minifyImages));
  cb();
}));