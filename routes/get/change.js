
var r = req.query;
if (!r.matchid)
	return res.send(500, "Nema matchid");
var db = require ("monk")("localhost/magic");
db.get("matches").findOne({matchid : r.matchid}, function (err, m){
	switch(r.mode) {
		case "move" : break;
		case "shuffle" : break;
		case "random" : break;
		case "all" : break;
		case "top" : break;
		case "bottom" : break;
	}
});