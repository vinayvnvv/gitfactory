app.controller('mainCtrl', ['$scope', function($scope){

	   $scope.data = [

	              {
	              	name:"nokia",
	              	price:200
	              } , 
	              {
	              	name:"nokia2",
	              	price:200
	              } , 
	              {
	              	name:"nokia3",
	              	price:200
	              } , 
	              {
	              	name:"nokia4",
	              	price:200
	              }
	              ];

	    $scope.view = "templates/list.html";
	    $scope.viewFlag = 1;

	    $scope.changeView = function() {

             if($scope.viewFlag == 1) {
             	$scope.view = "templates/grid.html";
	    		$scope.viewFlag = 2;
             } else {
             	$scope.view = "templates/list.html";
	    		$scope.viewFlag = 1;
             }

	    }
	
}]);
