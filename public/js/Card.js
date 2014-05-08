
var Cards = {};

var Card = function(template) {
 this.id = template._id || "";
 this.name = template.name || "";
 this.type = template.type || "";
 this.image = template.image || "";
 
 if(this.image) {
  this.element = $("<div class='full-karta' data-id='" + this.id + "'><img class='karta' src='" + this.image + "' /><img class='poledjina' src='/img/back.jpg' /></div>");
 }

 this.place = "";
 this.state = {
	"flip" : 0, 
	"tap" : 0, 
	"faceDown" : 0 
 };

 this.in = function(z) {
  this.place = z;
  this.element
   .removeClass(!Zone.decked[z] ? "decked" : "not-decked")
   .addClass(Zone.decked[z] ? "decked" : "not-decked");

  if(Zone.faceDown[z]) {
   this.element.find('.karta').fadeOut();
   this.element.find('.poledjina').fadeIn();   
  } else {
   this.element.find('.karta').fadeIn();
   this.element.find('.poledjina').fadeOut();
  } 

  // pomeri u tu zonu  
  return this;
 }
 
 this.tap = function() {
   this.state.tap = !this.state.tap;
 }

 this.faceDown = function() {
   this.state.faceDown = !this.state.faceDown;
 }
 
 this.flip = function() {
   this.state.flip = !this.state.flip;
 }

 return this;
};
