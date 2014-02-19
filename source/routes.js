
module.exports = {};

module.exports.load = function(_config) {
  var fs = require('fs');

  [ "get", "head", "post", "put", "delete" ].forEach(function(method) {
    module.exports[method] = {};
    (function(exp) {
      try {
        fs.readdirSync("./routes/" + method + "/").forEach(function(file) {
          var c = fs.readFileSync("./routes/" + method + "/" + file).toString();
          var _fn = eval("(function(config) { socketIOPath = ''; if(config.usesSocketIO) socketIOPath='/socket.io/socket.io.js'; params = { config: config, paths: { socketIO : socketIOPath } }; return function(req, res) { " + c + " }; })");
          (function(fn) {
            exp[file.replace('.js', '')] = fn;
          })(_fn(_config));  
        });
      } catch(err) {}
    })(module.exports[method]);
  });
}