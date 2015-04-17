var gulp = require('gulp');

// init plugins
var concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src(['src/paperboy.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('paperboy.js'))
        .pipe(gulp.dest('dist/')) 
        .pipe(uglify())
        .pipe(sourcemaps.write())      
        .pipe(rename('paperboy.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);
