
function deprecated(nova, ime_stare, ime_nove) {
 return function() {
  console.error(ime_stare + " IS DEPRECATED: use " + ime_nove + "!");
  nova.apply(this, arguments);
 }
}

function addEventHandler(obj, evt, handler) {
    if(obj.addEventListener) {
        obj.addEventListener(evt, handler, false);
    } else if(obj.attachEvent) {
        obj.attachEvent('on'+evt, handler);
    } else {
        obj['on'+evt] = handler;
    }
}

var cards = {};

cards.play = function(card, table) {
 table = table || "#table";
 $("<img class='card' src='"+ card.image +"'/>")
       .appendTo(table)
       .draggable()
       .click(function() {
        $(this).toggleClass('tapped');
       });
}

var play_card = deprecated(cards.play, "play_card", "cards.play(card, table)");

cards.load = function (opcije, fn) {
 opcije = opcije || {};
 if(typeof load_cards_fn == "function") {
  fn = fn || load_cards_fn;
 }
 $.getJSON("load_cards", opcije, function(f) {
  console.log(f);
  if(fn) fn(f); 
 });
};

var load_cards = deprecated(cards.load, "load_cards", "cards.load(opcije, fn)");

$(function() {
 $(".window")
  .draggable()
  .resizable();
});