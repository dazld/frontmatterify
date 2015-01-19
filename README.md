# frontmatterify

Browserify transform for front matter files.

Supports transforming YAML and JSON Front Matter format files into objects, so you can require them directly on the client. 

For now, expects files to have the following extensions:

```js

// tries to transform 
// *.yaml.fm
// *.json.fm

var page = require('./articles/page.yaml.fm'); // YAML front matter
var other = require('./articles/other.json.fm'); // JSON front matter

console.log(page.attributes); // whatever was in the front matter
console.log(page.body); // the body as a string (markdown, html, txt, whatever)

```

No magic, but can be combined with something like bulkify for requiring folder(s) of files for bundling, which then become available as the parsed front matter files..
