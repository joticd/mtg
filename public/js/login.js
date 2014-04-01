
$(function() {
 $("#login").click( function () {
   $.post("login",{
    username : $("#user").val(), 
    password : $("#pass").val()
   }, function(data) {
    window.location = "deckbuilder";
   });
 });
 
 if($("#yeyeye").length > 0) {
  window.location = "deckbuilder";
 }
});
    