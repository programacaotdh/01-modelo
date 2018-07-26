var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    clean   = require('gulp-clean'),
    wait    = require('gulp-wait'),
    rename  = require('gulp-rename'),
    concat  = require('gulp-concat-util'),
    minify  = require('gulp-minify-css');

// Compile Sass
gulp.task('sass', ['clean-css'], function() {
    return gulp.src(['dev/scss/*.scss', 'dev/css/**/*.css'])
        .pipe(wait(200))
        .pipe(sass())
        .pipe(gulp.dest('app/assets/css'));
});

// Clean CSS Folder
gulp.task('clean-css', function() {
    return gulp.src('app/assets/css')
        .pipe(clean());
});

// Critical Path
gulp.task('critical-css', ['clean-critical'], function() {
    return gulp.src('dev/scss/critical/*.scss')
        .pipe(wait(200))
        .pipe(sass())
        .pipe(minify())
        .pipe(concat.header('<style>'))
        .pipe(concat.footer('</style>'))
        .pipe(rename({
            basename: 'criticalCSS',
            extname: '.php'
        }))
        .pipe(gulp.dest('app/includes/'));
});

// Clean includes Folder
gulp.task('clean-critical', function() {
    return gulp.src('app/includes/criticalCSS.php')
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
gulp.task('compile', ['critical-css', 'sass', 'js'], function() {
    gulp.watch(['dev/scss/**/*.scss'], ['sass', 'critical-css']);
    gulp.watch(['dev/css/**/*.css'], ['sass']);
    gulp.watch(['dev/js/**/*.js'], ['js']);
});

gulp.task('default', ['compile']);