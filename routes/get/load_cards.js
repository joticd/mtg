var db = require ("monk") ("localhost/magic");
var cards = db.get("cards");
var crit = req.query;
//console.log(crit);
cards.find (crit, function(err, docs) { 
 res.end(JSON.stringify(docs)); 
});