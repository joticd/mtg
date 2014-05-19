
var chain = require('./chain');

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

var cc = 0;
require('./shuffle.js');

var c = chain();

var findIfMatchExists = function(next, opt) {
  matches.findOne({ "matchid" : matchid }).complete(function(err, m) {
    if(m == null) {
      opt.info = {};
      next();
    } else {
      res.send(m);
    }
  });
};

var createPlayer = function(index) {
  return function(next, opt) {
    q = { username : (index == 1 ? p1_username : p2_username) };
    console.log(q)
    users.findOne(q, function(err, user) {
      if(!user) {
        res.send("user is null");
        return;
      } else {
        opt.user = user;
        opt.deck = user.decks[(index == 1 ? p1_deckindex : p2_deckindex)];
        next();
      }
    });
  };
};

var createPlayersDeck = function() {
  return function(next, opt) {
    decks.findOne({ _id : opt.deck }, function(err, deck) {
      if(!deck) {
        res.send("deck is null");
        return;
      } else {
        var dck = [];
        for(var i in deck.cards) {
          var c = deck.cards[i];
          for(var broj = 0; broj < c; broj++) {
            dck.push(i + "_" + (++cc));
          }
        } 
        dck.shuffle();

        opt.info[opt.user._id] = {
         hand: [], 
         battlefield :[],
         graveyard :[],
         exile : [],
         library: dck,
         life: 20,
         poison: 0
       };

       delete opt.user;
       delete opt.deck;
       next();     
      }
    });
  };
};

var registerMatch = function(next, opt) {
  opt.info["matchid"] = matchid;

  matches.insert(opt.info, function(e, d) {
    res.send(d);
  });
};

c.take(findIfMatchExists)
 .and(createPlayer(1))
 .and(createPlayersDeck())
 .and(createPlayer(2))
 .and(createPlayersDeck())
 .and(registerMatch)
 .start();
