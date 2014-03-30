
var match = require("./matches")(req.body.mid);
match.open(function(data) {
 var p = parseInt(req.body.p);	
 var a = parseInt(req.body.a);

 if (p ==1 || p == 2){
  data["player" + p].poison += a;
  match.save(data, function() {
    res.send(data["player" + p].poison);
  });
 }
});