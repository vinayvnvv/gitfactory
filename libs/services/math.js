app.service('Math', function(){

    var mul = 3;
    this.mul = mul;
	this.add = function(a, b) {
         return (a+b)*mul;
	}

	console.log(mul);
	console.log(this.mul);

	
});