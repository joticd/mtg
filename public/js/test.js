
var counter = 0;
var dcounter = 0;  
var ttop = ["#tests"];

var Expectation = function (value) {
 counter++;

 this.testIt = function(a, r) {
  var t = ttop[0];
  if(r) $(t).append('<div class="ok">[' + counter + '] ok</div>');
  else $(t).append("<div class='err'>[" + counter + "] value " + JSON.stringify(value) + " expected to be " + a +"</div>");

  return r;
 }

 this.toBe = function(b) {
  return this.testIt(b, value == b);
 }
 
 this.toBeUndefined = function(){
  return this.testIt("undefined", value == undefined);
 }

 this.toBeLessThan = function(b) {
  return this.testIt("less than " + b, value < b);
 }
  
 return this;
};

var expect = function(b){
 return new Expectation(b);
}

var describe = function(d, c) {
 console.log("?");
 counter = 0;
 dcounter++;
 console.log(ttop);
 $(ttop[0]).append("<div>" + d + "</div><div class='desc' id='d"+dcounter+"'></div>");
 ttop.unshift("#d" + dcounter);
 if(typeof c === "function") c();
 ttop.shift();
}
