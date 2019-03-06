var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var merge = require('merge2');
var tsConfig = require('./tsconfig.json');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', function () {
    // var stream = tsProject.src('src')
    var stream = gulp.src(['src/**/*.ts'])
        .pipe(ts(tsConfig.compilerOptions)); // your ES2015 code 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
        stream.dts.pipe(gulp.dest('bin')),
        stream.js.pipe(gulp.dest('bin'))
    ]);
});
gulp.task('watch', ['compile'], function () {
    var stream = nodemon({
        ext: 'ts',
        script: 'bin/index.js' // run ES5 code 
        , watch: 'src' // watch ES2015 code 
        , tasks: ['compile'] // compile synchronously onChange 
    }); 
    return stream;
});
/*
default task
*/
gulp.task('default', ['watch']);
// gulp.task('default', ['watch', 'start']);