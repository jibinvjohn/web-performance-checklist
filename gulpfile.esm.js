import glob from 'glob';
import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import rimraf from 'rimraf';
import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';

function clean() {
	return glob('./www/**/*.{html,jpg,svg,webp}', {}, function(er, files) {
		for(let file in files) {
			rimraf(files[file], () => {});
		}
	})
}

function compileNunjucks() {
	return gulp.src('src/*.html')
	.pipe(nunjucks.compile())
	.pipe(gulp.dest('www'));
}

function compressImages() {
	return gulp.src('src/img/**/*')
	.pipe(imagemin([
		imagemin.mozjpeg({quality: 75, progressive: true}),
	]))
	.pipe(gulp.dest('www/img'))
}

function createWebP() {
	return gulp.src('www/img/*.jpg')
	.pipe(imagemin([
		imageminWebp()
	]))
	.pipe(rename(function (path) {
		path.extname = ".webp";
	}))
	.pipe(gulp.dest('www/img'))
}

const build = gulp.series(clean, compileNunjucks, compressImages, createWebP);

export {
	clean,
	build
}