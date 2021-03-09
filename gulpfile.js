const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
var browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const { src } = require('gulp');

const cssFiles = [
    './src/css/main.css',
    './src/css/test.css'
];

const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
];

function clean() {
    return del(['build/*'])
}

function scss(){
    return gulp.src('./scss/**/*.scss',{allowEmpty:true})
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream())   
}

function scripts() {
    console.log("scripts")
    return gulp.src('./js/*.js',
        {allowEmpty:true})
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./scss/*scss',scss)
    gulp.watch('./js/*js', scripts);
    gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(scss, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));