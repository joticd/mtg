
var otherPlayer = null;

var mojeKarte = {};
var tvojeKarte = {};

var match_url = 'matches' + window.location.search;

var render = function(prefix, karte, data, player) {
	var side = data[player];
	$("#" + prefix + "life").text(side.life);
	$("#" + prefix + "poison").text(side.poison);
	var delovi = [ "library", "hand", "graveyard", "exile", "battlefield" ];
	for(var i in delovi) {
		(function(prefix, ii, cp) {
			var deo = delovi[ii];
			if($("#" + cp + "_" + deo).length == 0)	        
				$("body").append("<div id='" + cp + "_" + deo + "' class='zona " + prefix + "-" + deo + "'></div>");
			for(var k in side[deo]) {			
				(function(kk, cp, d) {
					var idd = side[deo][kk];
					if(karte[idd] == null) {
						$.getJSON('get_card', {
							id : idd.replace(/_.*/, "")
						}, function(card) {
							karte[idd] = new Card(card).in(deo);						
							$("#"  + cp + "_" + d).append(karte[idd].element); 
						});
					}
				})(k, cp, deo);
			}
		})(prefix, i, player);
	}
}

var tick = function() {
	$.get(match_url, function(data) {
		console.log(data);
		if(otherPlayer == null) {
			for(var i in data) {
				if(i == "matchid" || i == "_id" || i == currentPlayer) continue;
				otherPlayer = i;
			}
		}

		render("moj", mojeKarte, data, currentPlayer);
		render("tvoj", tvojeKarte, data, otherPlayer);
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