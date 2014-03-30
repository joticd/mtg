console.log(req.body);
var db = require ('monk')('localhost/magic');
var decks = db.get("decks");
var users = db.get("users");

var deck = {
 cards : req.body.brojac,
 name : req.body.ime
}

decks.insert(deck, function(e, d) {
 users.findOne({ "username" : req.session.username }, function(ee, user) { 	
  if(!user.decks)
   user.decks = [];
  
  user.decks.push(d._id);
  users.update({ "username" : req.session.username }, user, function() { 
   res.send(e);
  });
 });
});