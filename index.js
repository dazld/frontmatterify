var through = require('through');
var path = require('path');
var fs = require('fs');
var jsonFm = require('json-front-matter');
var yamlFm = require('yaml-front-matter');

function transform(file){
    
    var ext = path.extname(file);
    var fmType;

    if (ext !== '.fm') {
        return through();
    }

    if (/.json.fm$/g.test(file)) {
        fmType = 'json';
    } else if (/.yaml.fm$/g.test(file)) {
        fmType = 'yaml';
    }

    var buffer = '';

    switch(fmType) {
        case 'json':
            
            return through(function (chunk) {
                buffer += chunk;
            },function(){
                console.log(buffer);
                var parsed = jsonFm.parse(buffer);
                parsed = JSON.stringify(parsed);
                this.queue(parsed);
                this.queue(null);
            });

            break;
        case 'yaml':
            return through(function (chunk) {
                buffer += chunk;
            },function(){
                console.log(buffer);
                var parsed = yamlFm.parse(buffer);
                parsed = JSON.stringify(parsed);
                this.queue(parsed);
                this.queue(null);
            });

            break;
        default:
            console.log('unknown frontmatter type:', file);
            return through();
            break;

    }

    
}

module.exports = transform;
