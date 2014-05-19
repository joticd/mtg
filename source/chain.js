module.exports = function() {
	this.take = function(fn){
		this.fns.push(fn);
		return this;
	}
	this.fns = [];
	this.and = function(fn){
		this.fns.push(fn);
		return this;
	}
	this.start = function(){
		if (this.fns.length>0) {
			a = this.fns.shift();
			a(this.start);
 		};
	}
	return this;
}