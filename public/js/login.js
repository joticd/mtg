
$(function() {
 $("#login").click( function () {
   $.post("login",{
    username : $("#user").val(), 
    password : $("#pass").val()
   });
 });
});
    