
var match = require("./matches")(req.body.mid);
var p = parseInt(req.body.p);
var zona_pocetak = req.body.zp;
var q = parseInt(req.body.q);
var zona_kraj = req.body.zq;

match.open(function(data) {
  var pz = data["player" + p][zona_pocetak];
  var index = pz.indexOf(req.body.idk);
  if(index == -1) {
    res.send(":(");
    return;
  }

  var removed = pz.splice(index, 1);  
  data["player" + q][zona_kraj].push(removed[0]);
  
  match.save(data, function() {
    res.send(":)");
  });
});