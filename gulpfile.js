/**
 * @file gulpefile.js. Task runner for JS.
 * @desc A task runner for JS
 */

/**
 * Requires the task runner's dependencies.
 * @requires
 */
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const bSync = require('browser-sync').create();
const bSyncDoc = require('browser-sync').create();

/**
 * Reloads the browser, upon saving changes in the watched files.
 */
gulp.task('default', () => {
	gulp.watch("js/*.js").on('change', bSync.reload);
	gulp.watch("css/*.css").on('change', bSync.reload);

	bSync.init({
		server: "./",
		port: 8000,
		index: "index.html",
		ui: false
	});

});

/*
 * Generates documentation on the `doc` directory.
 */
gulp.task('jsdoc', (cb) => {
	gulp.src(['./README.md', './js/*.js'], {read: false})
		.pipe(jsdoc(cb));
});

/*
 * Updates full documentation GUI, initiates it's server and reloads it on the browser.
 */
gulp.task('jsdoc-serve', () => {
	gulp.watch("js/*.js", ["jsdoc"]).on('change', bSyncDoc.reload);
	gulp.watch("README.md", ["jsdoc"]).on('change', bSyncDoc.reload);
	bSyncDoc.init({
		server: "./docs/gen",
		port: 8080,
		index: "index.html",
		ui: false
	});	
})