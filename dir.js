app.controller('dCtrl', ['$scope', 'AS', function($scope, AS){
	$scope.name = "Hello World!!!";
	console.log("dCtrl is called");
	console.log("from ctrl , add2(5) = " + AS.add2(5))
}])



app.controller('myDirCtrl', ['$scope', function($scope){
	$scope.ctrl = this;
}])

app.controller('aCtrl', ['$scope', function($scope){
	console.log("aCtrl is called");
	console.log(name);
	
}])

app.service('AS', function() {
	var name = "sjsdho";
	this.name1 = "vinay";
	console.log("name: " + name);
	console.log("this.name: " + this.name1);


	function add1(a) {
       return a+a;
	}

	this.add2 = function(a) {
		return a+a;
	}
})

app.directive('myDir', function() {
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		 scope: {
		 	name : "@", 
		 	ctrl : "@"
		 }, // {} = isolate, true = child, false/undefined = no change
	     controller:'myDirCtrl',
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		 restrict: 'A|E|C|M', // E = Element, A = Attribute, C = Class, M = Comment
		 template: '<h1> {{name}} </h1>',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		 link: function($scope, iElm, iAttrs, controller) {
			  iElm.bind("ng-controller",$scope.ctrl)
		 }

	};

});