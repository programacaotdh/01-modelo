var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    clean   = require('gulp-clean'),
    wait    = require('gulp-wait');

// Compile Sass
gulp.task('sass', ['clean-css'], function() {
    return gulp.src(['dev/scss/**/*.scss', 'dev/css/**/*.css'])
        .pipe(wait(200))
        .pipe(sass())
        .pipe(gulp.dest('app/assets/css'));
});

// Clean CSS Folder
gulp.task('clean-css', function() {
    return gulp.src('app/assets/css')
        .pipe(clean());
});

// Move JS
gulp.task('js', ['clean-js'], function() {
    return gulp.src('dev/js/**/*.js')
        .pipe(gulp.dest('app/assets/js'));
});

// Clean JS Folder
gulp.task('clean-js', function() {
	return gulp.src('app/assets/js')
		.pipe(clean());
});

// Compile and move CSS and JS
gulp.task('compile', ['sass', 'js'], function() {
    gulp.watch(['dev/scss/**/*.scss'], ['sass']);
    gulp.watch(['dev/css/**/*.css'], ['sass']);
    gulp.watch(['dev/js/**/*.js'], ['js']);
});

gulp.task('default', ['compile']);