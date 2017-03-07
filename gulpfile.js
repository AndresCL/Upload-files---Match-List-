var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('fontawesome', function() { 
    return gulp.src('bower_components/components-font-awesome/css/**.*') 
        .pipe(gulp.dest('./css'));
});

gulp.task('icons', function() { 
    return gulp.src('bower_components/components-font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./fonts'));
});

gulp.task('default', ['sass', 'icons', 'fontawesome'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});

