var db = require('monk')('localhost/magic');
var cards = db.get("cards");
cards.find ({}, function(err, docs) {
  var r = docs.reduce (function (pV, cV, i, a){
   return (pV == "" ? " " : pV+", ")+a[i].name;
  }, "");
  params.cards = r;
  res.render('mongo', params);
});