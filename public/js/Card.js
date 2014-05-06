
var Places = {
	Hand : 0,
	Battlefield : 1,
	Graveyard : 2,
	Library : 3,
	Exile : 4
}

var Cards = {};

var Card = function(template) {
 this.id = template._id || "";
 this.name = template.name || "";
 this.type = template.type || "";
 this.image = template.image || "";
 if(this.image) {
  this.element = $("<img class='karta' src='" + this.image + "' />");
 }
 this.place = Places.Library;
 this.state = {
	"flip" : 0, 
	"tap" : 0, 
	"faceDown" : 0 
 };

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
