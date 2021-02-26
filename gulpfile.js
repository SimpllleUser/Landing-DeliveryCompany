const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
var browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const { src } = require('gulp');
 
// gulp.task('sass', function () {
//   gulp.src('./scss/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('../css'));
// });
 
// gulp.task('sass:watch', function () {
//   gulp.watch('./scss/**/*.scss', ['sass']);
// });

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

// function styles() {
//     console.log("styles")
//     return gulp.src(cssFiles)
//         // Кокатанация файлов css
//         .pipe(concat('style.css'))
//         // Авто префиксер
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         // Минификация сss
//         .pipe(cleanCSS({ level: 2 }))
//         .pipe(gulp.dest('./build/css'))
//         .pipe(browserSync.stream());
// }

function scss(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())   
}

function scripts() {
    console.log("scripts")
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({ toplevel: true }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //Отслеживать файлы по этому пути 
    // gulp.watch('./src/css/**/*css', styles);
    gulp.watch('./src/scss/**/*scss',scss)
    gulp.watch('./src/js/**/*js', scripts);
    gulp.watch("./*.html").on('change', browserSync.reload);
}


// gulp.task('styles', styles);
gulp.task('scripts', scripts);
//Очистка файлов
gulp.task('del', clean);
//Отслеживать изминения
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(scss, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));