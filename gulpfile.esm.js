import glob from 'glob';
import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import rimraf from 'rimraf';
import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import critical from 'critical';
import path from 'path';
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

function generateCriticalCSS() {
	return glob('./www/*.html', {}, function(er, files) {
		for (let file in files) {
			const filename = path.basename(files[file]);
			critical.generate({
				inline: true,
				base: 'www/',
				src: filename,
				target: filename,
				width: 1300,
				height: 900,
				ignore: {
					atrule: ['@font-face']
				}
			});
		}
	});
}

const build = gulp.series(clean, compileNunjucks, compressImages, createWebP, compileSass, bundleJavaScript, generateCriticalCSS);

export {
	clean,
	build
}