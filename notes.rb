==> initialize project 
    npm init -y

==> Install Gulp globally
    npm install -g gulp

==> Install Gulp locally
    npm install --save-dev gulp

==> Create a Gulpfile manually in folder named gulpfile.js
    all task will 
    add this code to test gulp file
    
    const gulp = require('gulp');

    gulp.task('hello', () => {
      console.log('Hello, Gulp!');
    });

    // Add more tasks as needed
    

==> now we can install gulp based plugins & add tasks in gulpfile

basic plugis related to gulp 

1) minify normal css file
  install :- 
  npm install --save-dev gulp-cssmin

  task to be add in gulpfile.js :-   
    const gulp = require('gulp');
    const cssmin = require('gulp-cssmin');

    gulp.task('minify-css', () => {
      return gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
    });

    


