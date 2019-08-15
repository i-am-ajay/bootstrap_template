const {series,src,dest,watch} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');

function sass_func(){
  return src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss']).
    pipe(sass()).
    pipe(dest('src/css')).
    pipe(browserSync.stream())
}
function js(){
  return src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js']).
  pipe(dest('src/js')).
  pipe(browserSync.stream())
}

function server(){
  browserSync.init({
    server:{
      baseDir : './src'
    }
  });
  watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],sass_func);
  watch('src\*.html').on('change',browserSync.reload);
  watch('src\*.js').on('change',browserSync.reload);
}

function fonts(){
  return src('node_modules/font-awesome/fonts/*').
    pipe(dest('src/fonts'));
}

function fa(){
  return src('node_modules/font-awesome/css/font-awesome.min.css').pipe(dest('src/css'));
}

exports.default = series(fonts,sass_func,js,server,fa);
