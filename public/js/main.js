function addEventHandler(obj, evt, handler) {
    if(obj.addEventListener) {
        obj.addEventListener(evt, handler, false);
    } else if(obj.attachEvent) {
        obj.attachEvent('on'+evt, handler);
    } else {
        obj['on'+evt] = handler;
    }
}

$(function () {
 $("#info-submit").click(function(e) {
  $.post("add_card", {
   name : $("#info-name").val(),
   type : $("#info-type").val(),
   cost : $("#info-cost").val(),
   ability : $("#info-ability").val(),
   power : $("#info-power").val(),
   toughness : $("#info-toughness").val(),
   image : $("previewImage").attr("src")
  }, function(ok) {});
  
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
  
 $.getJSON("load_cards", function(f){
  for ( var e in f){
  (function (c,d){
   $("<li class = 'cardLi'>" + d[c].name + "</li>")
    .appendTo("#list")
    .click(function() {
        $("<img class ='card' src='cards/"+ d[c].name +".jpg'/>")
            .appendTo("#table")
            .draggable()
            .click(function() {
             $(this).toggleClass('tapped');
            });                            
     });    
    })(e,f);
/*
   $("<img class ='card' src='cards/"+ d[c].name +".jpg'/>")
    .appendTo("#table")
    .draggable()
    .click(function() {
      $(this).toggleClass('tapped');
    });
*/

  }
 });
});
