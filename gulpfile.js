var gulp 				= require('gulp'),
	autoprefixer 		= require('gulp-autoprefixer'),
	browserSync  		= require('browser-sync').create(),
	rename 				= require('gulp-rename'),
	gcmq 					= require('gulp-group-css-media-queries'),
	cleanCSS 			= require('gulp-clean-css'),
	plumber 				= require('gulp-plumber'),
	stylus 				= require('gulp-stylus'),
	uglify 				= require('gulp-uglify'),
	babel 				= require('gulp-babel'),
	imagemin 			= require('gulp-imagemin');



gulp.task( 'browser-sync', ['stylus'] ,function() {
		browserSync.init({
				server: {
						baseDir: "./"
				},
				notify: false
		});
});

gulp.task('stylus', function () {
	return gulp.src('./_styles/style.styl')
	.pipe(plumber())
  .pipe(stylus())
	.pipe(gcmq())
	.pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
	.pipe(cleanCSS())
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest("./_styles/"))
	.pipe(browserSync.stream());
});


gulp.task('watch', function () {
	gulp.watch("./_styles/*.styl", ["stylus"]);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./_scripts/*.js', ['uglify']);
	gulp.watch('./_scripts/*.js').on("change", browserSync.reload);

});

gulp.task('default', ['browser-sync', 'watch']);


gulp.task('uglify', function() {
 		return gulp.src('./_scripts/*.js')
 	.pipe(plumber())
 	.pipe(babel({
            presets: ['es2015']
        }))
   .pipe(uglify())
   .pipe(rename({suffix: '.min', prefix : ''}))
   .pipe(gulp.dest('./dist/'))
});

gulp.task('imagemin', function() {
	return gulp.src('./_img/*')
	.pipe(imagemin({
				interlaced: true,
   			progressive: true,
   			optimizationLevel: 5
 				}))
	.pipe(gulp.dest('./_img/')); 
});
