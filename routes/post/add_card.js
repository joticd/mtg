
var db = require ("monk") ("localhost/magic");
var cards = db.get("cards"); 
console.log(req.body);
cards.insert(req.body, function(err, docs) { 
 res.end(JSON.stringify(docs));
});