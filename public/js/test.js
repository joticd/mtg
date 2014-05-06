
var counter = 0;
var dcounter = 0;
var itcounter = 0;  
var ttop = ["#tests"];

var Expectation = function (value) {
 counter++;

 this.testIt = function(a, r) {
  var t = ttop[0];
  if(r) $(t).append('<div class="ok">[' + counter + '] ok</div>');
  else $(t).append("<div class='err'>[" + counter + "] value " + JSON.stringify(value) + " expected to be " + a +"</div>");

  return r;
 }

 this.error = function(r) {
  var t = ttop[0];
  $(t).append("<div class='err'>[" + counter + "] error: " + r + "</div>");
  return r; 
 }
 
 this.toBe = function(b) {
  return this.testIt(b, value == b);
 }

 this.toBeUndefined = function(){
  return this.testIt("undefined", value == undefined);
 }

 this.toBeKnown = function() {
  return this.testIt("known", value != undefined);
 }
 
 this.toBeLessThan = function(b) {
  return this.testIt("less than " + b, value < b);
 }
 
 this.toBeGreaterThan = function(b) {
   return this.testIt("greater then " + b, value > b);
  }
    
  this.toMatch = function(b) {
   return this.testIt("match to " + b, value.match(b));
 }
       
            
 return this;
};

var fail = function() {
 var t = ttop[0];
 $(t).append(" -- fail");
}

var expect = function(b){
 return new Expectation(b);
}

var describe = function(d, c) {
 counter = 0;
 dcounter++;
 $(ttop[0]).append("<div class='hdr'>" + d + "</div><div class='desc' id='d"+dcounter+"'></div>");
 ttop.unshift("#d" + dcounter);
  try {
   c();
  } catch(err) {
   expect("error").error(err);
  }

 ttop.shift();
}

var it = function(d, c) {
 itcounter++;
 $(ttop[0]).append("<div class='hit'>[*] " + d + "</div><div class='it' id='it"+itcounter+"'></div>");
 ttop.unshift("#it" + itcounter);

  try {
   c();
  } catch(err) {
   expect("error").error(err);
  }
 
 ttop.shift();
}