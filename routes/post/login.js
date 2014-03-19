var x = require ("./users");
x.check(req.body.username, req.body.password, function(result) {
 if(result != null) {
  req.session.username = req.body.username;
 }

 result = (result != null ? "true" : "false");
 res.send(result);
});