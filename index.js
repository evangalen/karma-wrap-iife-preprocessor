'use strict';

var wrapIife = require('wrap-iife');
var convertSourceMap = require('convert-source-map');


function factory(logger, basePath, config) {
    var log = logger.create('preprocessor.wrap-iife');

    return function (content, file, done) {
        var existingSourceMapResult = convertSourceMap.fromSource(content);

        var result = wrapIife(file.path, content,
                {sourceMaps: true, inputSourceMap: existingSourceMapResult && existingSourceMapResult.toObject()});

        done(null, result.contents + '\n' + convertSourceMap.fromObject(result.sourceMap).toComment());
    };
}

factory.$inject = ['logger', 'config.basePath'];

module.exports = {
    'preprocessor:wrap-iife': ['factory', factory]
};
