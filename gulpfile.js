let project_folder = 'dist';
let source_folder = '#src';

let path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/images/',
		fonts: project_folder + '/fonts/',
		icons: project_folder + '/icons/',
	},
	src: {
		html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
		css: source_folder + '/scss/main.scss',
		js: source_folder + '/js/index.js',
		img: source_folder + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/**/*.{eot,svg,ttf,woff}',
		icons: source_folder + '/icons/**/*.*',
	},
	watch: {
		html: source_folder + '/**/*.html',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
	},

	clean: './' + project_folder + '/',
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	webphtml = require('gulp-webp-html');


function browse() {
	browsersync.init({
		server: {
			baseDir:  './' + project_folder + '/'
		},
		port: 3000,
		notify: false,
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true,
			})
		)
		.pipe(dest(path.build.css))
		.pipe(cleancss())
		.pipe(
			rename({
				extname: '.min.css'
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: '.min.js'
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream())
}
function icons() {
	return src(path.src.icons)
		.pipe(dest(path.build.icons))
		.pipe(browsersync.stream())
}

function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean() {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts, icons));
let watch = gulp.parallel(build, watchFiles, browse);

exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.icons = icons;
exports.watch = watch;
exports.default = watch;