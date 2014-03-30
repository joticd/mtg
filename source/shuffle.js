
Array.prototype.shuffle = function(){
    var o = this;
    for(var j, x, i = o.length; i; 
	j = Math.floor(Math.random() * i), 
	x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
