
'use strict';
(function() {
var app = angular.module('myApp', ['smart-table']);
	
app
	.run(function($rootScope){})
	.controller('safeCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http){

		$scope.rowCollection = [];
		$scope.displayedCollection = [];
		$scope.options = [{ name: "5", value: 5 }, { name: "10", value: 10 },{ name: "15", value: 15 }, { name: "20", value: 20 }];
		$scope.itemsByPage = $scope.options[0];

		$http.get('http://jsonplaceholder.typicode.com/posts').success(function(data){
            $scope.rowCollection  = data;
        });
		
		//remove to the real data holder
		$scope.init = function(){
			// SEND AJAX REQUEST
			$http({
				url: 'http://jsonplaceholder.typicode.com/posts',
				method: 'GET',
				data: {},
				headers: {
					"contentType": 'application/json',
				}
			})
				.success(function(result){
					$scope.rowCollection=result;
				})
				.error(function(err){
					console.log("error : "+err);
				});
		}

	}
	]);
})();

/**
// --- Runner -------------------------
(function () {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        execJasmine();
    };

    function execJasmine() {
        jasmineEnv.execute();
    }

})();**/