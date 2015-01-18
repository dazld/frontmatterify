var through = require('through');
var path = require('path');
var fs = require('fs');
var jsonFm = require('json-front-matter');
var yamlFm = require('yaml-front-matter');

function transform(file) {

    var ext = path.extname(file);
    var parser;

    if (ext !== '.fm') {
        return through();
    }

    if (/.json.fm$/g.test(file)) {
        parser = jsonFm.parse.bind(jsonFm);
    } else if (/.yaml.fm$/g.test(file)) {
        parser = yamlFm.parse.bind(yamlFm);
    }

    var buffer = '';
    if (!parser) {
        console.log('unknown frontmatter type:', file);
        return through();
    }

    return through(function(chunk) {
        buffer += chunk;
    }, function() {
        var parsed = parser(buffer);
        parsed = 'module.exports=' + JSON.stringify(parsed) + ';';
        this.queue(parsed);
        this.queue(null);
    });

}

module.exports = transform;
