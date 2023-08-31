import glob from 'glob';
import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import rimraf from 'rimraf';
import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
const rollup = require('rollup');
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

function clean() {
	return glob('./www/**/*.{html,jpg,svg,webp,css,js}', {}, function(er, files) {
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

function compileSass() {
	return gulp.src('./src/scss/style.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('./www/'));
}

async function bundleJavaScript() {
	const bundle = await rollup.rollup({
		input: './src/js/global.js',
		plugins: [nodeResolve(), terser()]
	})
	await bundle.write({
		file: `./www/global.js`,
		format: 'iife'
	});
}

const build = gulp.series(clean, compileNunjucks, compressImages, createWebP, compileSass, bundleJavaScript);

export {
	clean,
	build
}