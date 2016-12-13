app.controller("mainCtrl",["$scope", "$log", "$location", "$window", "sessionSave", function( $scope, l, $location, $window, sessionSave){

  
       angular.forEach(sessionStorage, function (item,key) {
          console.log(key + "-->" + item);
      });

      

       $scope.clearFields = function() {

            sessionSave.clearSession("main-home");

       }



}]);

//param : (state) -> current state name to remove the session keys
app.service("sessionSave", function() {
    this.clearSession = function(state) {
    	angular.forEach(sessionStorage, function (item,key) {
    		var str = key;
            var n = str.lastIndexOf("@#=");
            var str1 = str.slice(0,n);
            if(str1 == state)
              sessionStorage.removeItem(key);
      });
    }
});


app.directive('mcaSessionSave', ['$parse', '$window', function($parse, $window){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		 //controller: function($scope, $element, $attrs, $transclude) { },
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		 restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, iElm, iAttrs, controller) {

			 var state = "main-home";
			
			var type = iAttrs.type;
			console.log(type)
            var key = null;
            var value;
			//common functions
		    function boolean(boolean) { if(boolean=='true') return true; else return false};
		    function storageHolder() {
		    	   
               
                   if(iAttrs.mcaSessionSave.length == 0) {
                   	      key = state + "@#=" + iAttrs.ngModel;
                   	      value = sessionStorage.getItem(key);
                   } else {
                   	       key = state + "@#=" + iAttrs.mcaSessionSave;
                   		   value = sessionStorage.getItem(key);
                   }
                   return;
		    };
            storageHolder();

			if( (value!=null) ) putValues(); 

             
             function putValues() {
                if(type=='number') {
                
                   if(value.length!=0) {    
                    $parse(iAttrs.ngModel)
                        .assign(scope, parseInt(value));
                    }
                    
                    } else if(type=='checkbox') {
                        iElm["0"].checked = boolean(value);
                           $parse(iAttrs.ngModel)
                            .assign(scope, boolean(value));

                    } else if(type=='radio') {
	                       $parse(iAttrs.ngModel)
			                .assign(scope, boolean(value));
			            

		            } else if(type=='date') {
                           $parse(iAttrs.ngModel)
                            .assign(scope, "12/11/1994");
                        

                    } else {
                         $parse(iAttrs.ngModel)
                          .assign(scope, value);
                    }
            }


		               

			  iElm.bind('keyup', function (event) {
			  	sessionStorage.setItem(key, iElm["0"].value);
			  	console.log(iElm);
            });

			  iElm.bind('click', function (event) {
			  	if(type=='checkbox') {
			  	sessionStorage.setItem(key, iElm["0"].checked);
			  	}

			  	 if(type=='radio') {
			  	 	   console.log(key + "-->" +iAttrs.ngValue)
                        sessionStorage.setItem(key, iAttrs.value);
                
                }


            });
		}
	};
}]);

app.directive('mcaStrictInputNumber', ['$parse', '$window', function($parse, $window){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		 restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {


             function doBind(code) {
             	  value = iElm["0"].attributes['mca-strict-last-input-number'].value;
             	  if(value.length>0)
             	    
                  iElm["0"].value = parseInt(value);

             }
             iElm.bind('keydown', function (event) {
			 	iElm.attr('mca-strict-last-input-number', iElm["0"].value);
            });


			 iElm.bind('keyup', function (event) {
			 	code = event.keyCode;
			  	if( (code == 107) || (code == 187) )
             		doBind();
             	if( (code == 109) || (code == 189) )
             	    doBind();
             	if(code == 69)
             	    doBind();

             	iElm.attr('mca-strict-last-input-number', iElm["0"].value)
            });
			
		}
	};

	
}]);

app.directive('mcaClearSessionSave', ['$location', '$window', function($location, $window) {
		return {
			 restrict: 'A',
			 link: function($scope, iElm, iAttrs, controller) {

              iElm.bind('click', function (event) {
			 	sessionStorage.clear();
				 	if(iAttrs.mcaClearSessionSave == 'reload')
	       	           $window.location.href = $location.url();

       	   		}); 
				
			}
		};
	}]);