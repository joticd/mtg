function addEventHandler(obj, evt, handler) {
    if(obj.addEventListener) {
        obj.addEventListener(evt, handler, false);
    } else if(obj.attachEvent) {
        obj.attachEvent('on'+evt, handler);
    } else {
        obj['on'+evt] = handler;
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
 var search = function (){
  var rezultat = {};
  var children = $("#crits").children();
  for(var i = 0; i<children.length; i++){
    var name = $($(children[i]).children()[0]).val();
    var value = $($(children[i]).children()[name == "type"? 2:1]).val();
    rezultat[name] = value;
  }
  console.log (rezultat);
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
  console.log (data);
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
 $(".window")
  .draggable()
  .resizable();
  
 var load_cards = function (opcije) {
 console.log(opcije);
 opcije = opcije || {};
 $.getJSON("load_cards", opcije, function(f) {
  console.log(f);
  $("#list").html("");
  for (var e in f) {
   (function (c,d) {
    $("<li class = 'cardLi'>" + d[c].name + "</li>")
     .appendTo("#list")
     .click(function() {
      $("<img class ='card' src='"+ d[c].image +"'/>")
       .appendTo("#table")
       .draggable()
       .click(function() {
        $(this).toggleClass('tapped');
       });                            
     });    
   })(e,f);
  }
 });
 };

 load_cards();
});
