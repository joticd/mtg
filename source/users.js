
var internal = function(u, p) {
 var sp = require("./pass")(u, p);
 db = require('monk')('localhost/magic');
 users = db.get("users");
 return { sp : sp, users : users };
};

var create = function(u, p) {
  var i = internal(u, p);
  i.users.insert({ username: u, password: i.sp });
}

var check = function(u, p, fn) {
  var i = internal(u, p);
  i.users.findOne({ username: u, password: i.sp }, function(e, x) {
    if(fn) fn(x);
  });
}

module.exports = { create : create, check : check };