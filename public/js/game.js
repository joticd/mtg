
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
       (function(ii, cp) {
        var deo = delovi[ii];
        if($("#" + cp + "_" + deo).length == 0)	        
          $("body").append("<div id='" + cp + "_" + deo + "' class='zona moj-" + deo + "'></div>");
        for(var k in side[deo]) {
          (function(kk, cp, d) {
            var idd = side[deo][kk];
            if(mojeKarte[idd] == null) {
              $.getJSON('get_card', {
                id : idd.replace(/_.*/, "")
              }, function(card) {
                mojeKarte[idd] = new Card(card).in(deo);
                $("#"  + cp + "_" + d).append(mojeKarte[idd].element); 
              });
            }
          })(k, cp, deo);
        }
       })(i, currentPlayer);
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