console.log(req.body);
var db = require ('monk')('localhost/magic');
var deck = db.get(req.body.ime);
deck.insert(req.body.brojac, function(e){
 res.send(e);
});