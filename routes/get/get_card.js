var db = require ("monk") ("localhost/magic");
var cards = db.get("cards");
var id = req.query.id;

cards.findById(id, function(err, docs) { 
 res.end(JSON.stringify(docs)); 
});