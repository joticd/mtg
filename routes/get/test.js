fs = require("fs");
dir = fs.readdirSync("public/js/tests");

var requires = [];
var alreadyThere = {};
var source = [];
var mock = {};

for(var i in dir) {
  var file = dir[i];  
  if(file.match(/.*.json$/)) {
    contents = JSON.parse(fs.readFileSync("public/js/tests/" + file));
    if(contents.require) {
      for(var r in contents.require) {
        var req = contents.require[r];
        if(!alreadyThere[req]) {
          alreadyThere[req] = 1;
          requires.push(req);
        }
      }
    }
    
    if(contents.mock) {
      mock[file.replace(".json", "")]=contents.mock;
    }
  } else {
    source.push(file); 
  }
}
params.tests = source;
params.mock = mock;
params.requires = requires;
params.title = "nodejs template";
res.render('test', params);