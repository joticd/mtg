console.log(currentPlayer);
var mojeKarte = {};
var tvojeKarte = {};

var match_url = 'matches' + window.location.search;
var tick = function() {
  $.get(match_url, function(data) {
      var side = data[currentPlayer];
      $("#mojlife").text(side.life);
      $("#mojpoison").text(side.poison);
      var delovi = [ "library", "hand", "graveyard", "exile", "battlefield" ];
      for(var i in delovi) {
       (function(ii) {
        var deo = delovi[ii];
        for(var k in side[deo]) {
          (function(kk) {
            var idd = side[deo][kk];
            if(mojeKarte[idd] == null) {
              $.getJSON('get_card', {
                id : idd.replace(/_.*/, "")
              }, function(card) {
                mojeKarte[idd] = card;
                console.log("pojedinacno ", idd, mojeKarte);
                mojeKarte[idd]._element = $("<img class='karta' src='" + card.image + "' />");
                mojeKarte[idd]._state = {
                  tapped : false,
                  flipped : false,
                  facedown : false
                };
                $("body").append(mojeKarte[idd]._element);              
              });
            }
          })(k);
        }
       })(i);
      }
  });
}

var timerId = 0;
var time = 10000;

timerId = setInterval(tick, time);
tick();

$(function() {
  var timerOn = true;
  $("body").keypress(function(e) {
    timerOn = !timerOn;
    if(!timerOn) {
      clearInterval(timerId);
    } else {
      timerId = setInterval(tick, time);
      tick();
    }
    console.log(timerOn);
  });
});