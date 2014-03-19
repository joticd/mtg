var brojac = {};

var updateCount = function () {
 suma = 0;
 for (i in brojac) {
  suma += brojac[i]
 }
 $("#deckList .title").text("Deck ("+ suma +")");
};

$(document).on("change", ".dlnInput", function() { 
 var id = $(this).attr("data-id");
 var count = parseInt($(this).val());
 brojac[id] = count;
 console.log(id, count, brojac[id]);
 updateCount(); 
});

$(document).on("keypress", ".dlnInput", function(event) {
 if (event.keyCode == 9 || event.keyCode == 8 || event.keyCode == 13) return true;
 if (event.keyCode >= 37 && event.keyCode <= 40) return true;
 console.log(event.keyCode, event.charCode);   
 if (event.which < 48 || event.which > 57) {
  event.preventDefault();
 }
});

var load_cards_fn = function(f) {
  $("#list").html("");
  for (var e in f) {
   (function (c,d) {
    $("<li class='cardLi'>" + d[c].name + "</li>")
     .appendTo("#list")
     .click(function() {
      var card = d[c];
      
      if(!brojac[card._id]) {
       brojac[card._id] = 1;
       $("<li class='deckLi'><div class='deckLiname'> " + d[c].name + "</ div><input class='dlnInput' type='text' value='1' data-id='" + card._id + "' /></li>")
           .appendTo("#deckCards")
      } else {       
       brojac[card._id]++;          
       if(brojac[card._id] > 4 && card.type != 'land') brojac[card._id] = 4;
       
       $("input[data-id='" + card._id + "']").val(brojac[card._id]);
      }
      updateCount();
     });
   })(e,f);
  }
}

var critText = "<div class='crit'><select class='crit-type'>" +
 "<option value='name'>Name</option>" +
 "<option value='ability'>Ability</option>" +
 "<option value='type'>Type</option>" +
 "<option value='cost'>Cost</option>" +
 "<option value='power'>Power</option>" +
 "<option value='toughness'>Toughness</option>" +
 "<input type='text' class='crit-text' />" +
 "<select class='crit-type-select' style='display: none;'>" +
 "<option value=''></option>" +
 "<option value='creature'>Creature</option>" +
 "<option value='enchantment'>Enchantment</option>" +
 "<option value='sorcery'>Sorcery</option>" +
 "<option value='instant'>Instant</option>" +
 "<option value='artifact'>Artifact</option>" +
 "<option value='land'>Land</option>" +
 "</select><button class='crit-remove'>-</button></div>";

$(function () {
 $("#saveDeck").click(function() {
  console.log(brojac);
  var posta = {};
  posta.brojac = brojac;
  posta.ime = $("#deckName").val();
  $.post("save_deck", posta, function (data){
   console.log(data);
  });
 });

 // pretraga i rad sa kriterijumima
 
 var search = function (){
  var rezultat = {};
  var children = $("#crits").children();
  for(var i = 0; i<children.length; i++){
    var name = $($(children[i]).children()[0]).val();
    var value = $($(children[i]).children()[name == "type"? 2:1]).val();
    rezultat[name] = value;
  }
  
  load_cards(rezultat);
  return rezultat;
 }

 $(document).on('click', '.crit-remove', function() {
  $(this).closest('.crit').remove();
  search();
 });  

 $(document).on('change', '.crit-text', search);
 $(document).on('change', '.crit-type-select', search);
 $("#cardEntery input[type='text']").val("");
 
 $(document).on('change', '.crit-type', function() {
  var v = $(this).val();
  if(v == "type") {
   $($(this).parent().children()[1]).hide();
   $($(this).parent().children()[2]).show();
  } else {
   $($(this).parent().children()[2]).hide();
   $($(this).parent().children()[1]).show();
  }
 });
 
 $("#addCrits").click( function () {
  $(critText).appendTo("#crits");
 });

 // unos nove karte

 $("#info-submit").click(function(e) {
  var data = {
   name : $("#info-name").val(),
   type : $("#info-type").val(),
   cost : $("#info-cost").val(),
   ability : $("#info-ability").val(),
   power : $("#info-power").val(),
   toughness : $("#info-toughness").val(),
   image : $("#previewImage").attr("src")
  };

  $.post("add_card", data , function(ok) {
   load_cards();
   $("#cardEntery").hide();
   $("#cardEntery input[type='text']").val("");
  });
  
  cancel(e);
 });
 
 function onDrop (e){
  if(!window.FileReader || $("#cardEntery").is(":visible")) {
    cancel(e);
    return;
  }
  
  e = e || window.event;
  var dt = e.dataTransfer;
  var file = dt.files[0];
  var reader = new FileReader();
  addEventHandler(reader, 'loadend', function(e, file) {
   $("#previewImage").attr("file", file).attr("src", this.result).fadeIn();
  });
  reader.readAsDataURL(file);
  
  $("#cardEntery").fadeIn();
  cancel(e);
 }
 
 function cancel(e) {
  if (e.preventDefault) { e.preventDefault(); }
  return false;
 }
  
 var drop = document.getElementById("table");
 addEventHandler(drop, 'dragover', cancel);
 addEventHandler(drop, 'dragenter', cancel);
 addEventHandler(drop, 'drop', onDrop);

 load_cards();
});
