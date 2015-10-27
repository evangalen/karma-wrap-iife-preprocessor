'use strict';

var wrapIife = require('wrap-iife');
var convertSourceMap = require('convert-source-map');


function factory(logger, basePath, config) {
    var log = logger.create('preprocessor.wrap-iife');

    return function (content, file, done) {
        var existingSourceMap = convertSourceMap.fromSource(content).toObject();

        var result = wrapIife(file.path, content, {sourceMaps: true, inputSourceMap: existingSourceMap});

        done(null, convertSourceMap.removeComments(result.contents) + '\n' +
            convertSourceMap.fromObject(result.sourceMap).toComment());
    };
}

factory.$inject = ['logger', 'config.basePath'];

module.exports = {
    'preprocessor:wrap-iife': ['factory', factory]
};
