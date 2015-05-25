/* global describe, it */

'use strict';

var assert = require('stream-assert'),
    es = require('event-stream'),
    should = require('should'),

    gulp = require('gulp'),
    gutil = require('gulp-util'),
    File = gutil.File,
    PassThrough = require('stream').PassThrough,
    config = require('../_config/project.json'),
    creds = require('../_config/creds'),
    sgc = require('../index');


describe('sass-generate-contents', function() {
    
    it('should emit error on streamed file', function (done) {
        gulp.src([config.src + '/' + config.dirs.styles + '/**/*.scss', config.dirs.partials + '/**/*.scss'], { buffer: false })
        .pipe(sgc(config.src + '/' + config.dirs.styles + '/_main.scss', creds))
        .on('error', function (err) {
          err.message.should.eql('Streaming not supported');
          done();
        });
    });

    it('should ignore null files', function (done) {
        gulp.src([config.src + '/' + config.dirs.styles + '/phantom-file.scss'])
        .pipe(sgc(config.src + '/' + config.dirs.styles + '/_main.scss', creds))
        .pipe(assert.length(0))
        .pipe(assert.end(done))
        .write(new File());
    });

    it('should not fail if creds are missing', function (done) {
        gulp.src([config.src + '/' + config.dirs.styles + '/**/*.scss', config.dirs.partials + '/**/*.scss'])
        .pipe(sgc(config.src + '/' + config.dirs.styles + '/_main.scss'))
        .pipe(assert.end(done));
    });

});