var p1 = (req.query.p1 || "").split(":")
var p2 = (req.query.p2 || "").split(":")
 
var p1_username = p1[0]
var p1_deckindex = p1[1]

var p2_username = p2[0]
var p2_deckindex = p2[1]

var matchid = req.query.p1 + req.query.p2;
var db = require('monk')('localhost/magic');
var matches = db.get('matches');
var users = db.get('users');
var decks = db.get('decks');

require('./shuffle.js');

matches.findOne({ "matchid" : matchid }).complete(function(e, m) {
 if (m == null) {
  var p2_fn = function() {
   users.findOne({ "username" : p2_username }, function(er, user) {
    var deckid = user.decks[p2_deckindex];
    decks.findOne({ "_id" : deckid }, function(er, deck) {
     var p2_deck = [];
     for(var i in deck.cards) {
      var c = deck.cards[i];
      for(var broj = 0; broj < c; broj++) {
       p2_deck.push(i);
      }
     }
     p2_deck.shuffle();

     info["player2"] = {
       hand: [], 
       battlefield :[],
       graveyard :[],
       exile : [],
       library: p2_deck,
       life: 20,
       poison: 0
     };     
     
     info["matchid"] = matchid;

     matches.insert(info, function(e, d) {
      res.send(d);
     });
    });
   });
  };

  users.findOne({ "username" : p1_username }, function(er, user) {
    var deckid = user.decks[p1_deckindex];
    decks.findOne({ "_id" : deckid }, function(er, deck) {
     var p1_deck = [];
     for(var i in deck.cards) {
      var c = deck.cards[i];
      for(var broj = 0; broj < c; broj++) {
       p1_deck.push(i);
      }
     }
     p1_deck.shuffle();

     info = {};
     info["player1"] = {
       hand: [], 
       battlefield :[],
       graveyard :[],
       exile : [],
       library: p1_deck,
       life: 20,
       poison: 0
     };     
     p2_fn();
    });
   });
  } else {
   res.send(m);
  }
});

