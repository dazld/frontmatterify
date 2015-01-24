var fs = require('fs');
var assert = require('assert');
var _ = require('lodash');
var path = require('path');

var jsonTestPath = './test-files/test.json.fm';
// var yamlTestPath = './test-files/test.yaml.fm';

var expected = { attributes: { title: 'title' }, body: 'text\n' };

var fmify = require('../');

function assertEqual(result){
    var equal = _.isEqual(result, expected);
    assert.equal(equal, true);
    console.log('ok');
}

var exported = __dirname + '/output.js';

function testFile(input, cb){
    input = path.resolve(__dirname, input);
    fs.createReadStream(input)
      .pipe(fmify(input))
      .pipe(fs.createWriteStream(exported))
      .on('close', function(){
        var parsed = require(exported);
        assertEqual(parsed);
      });
}

testFile(jsonTestPath);



