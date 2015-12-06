'use strict';

let gulp = require('gulp');

let app = require('./app');
let config = require('config');
let shell = require('shelljs');

gulp.task('start', function() {
    app.listen(config.get('app.port'));
});

gulp.task('test', function() {
    if (!shell.which('mocha')) return shell.echo('Error. Mocha not installed');
    shell.exec('mocha', function(code, output) {
        // Как бы сделать так, чтобы оно ещё вывод раскрашивало в цвета?
        // (Как при обычном запуске Mocha)
        console.log('Exit code:', code);
        console.log('Program output:', output);
    });
});

gulp.task('help', function() {
    console.log('');
    console.log('');
    console.log('');
    console.log('=======================================>');
    console.log('');
    console.log('');
    console.log('');
    console.log(`Run commands: gulp <command>`);
    console.log('');
    console.log('');
    console.log(`Available commands:`);
    console.log('');
    console.log(`test - run application test with mocha`);
    console.log(`start - run application`);
    console.log('');
    console.log('');
    console.log('');
    console.log('=======================================>');
    console.log('');
    console.log('');
    console.log('');
});

