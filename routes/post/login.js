var x = require ("./users");
x.check(req.body.username, req.body.password, function(result) {
 if(result != null) {
  req.session.username = req.body.username;
  require('monk')('localhost/magic').get('users').findOne({ username : req.body.username }, function(err, user) {
   console.log(err, user);
   req.session.userid = user._id;
   result = (result != null ? "true" : "false"); 
   res.send(result);
   console.log(req.session);
  });
 } else {
  result = (result != null ? "true" : "false");
  console.log(result);
  res.send(result);  
 }
});