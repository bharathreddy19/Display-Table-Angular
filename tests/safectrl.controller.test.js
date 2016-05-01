
describe("UNIT : Testing Controller", function(){
	
	beforeEach(module('myApp'));
	var $controller;
	var $httpBackend;

	beforeEach(inject(function(_$controller_, _$httpBackend_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
	}));
	
	describe('$scope.init', function(){
		var $scope, controller;
		// REMOVE VARIALBES DUPLICATION
		beforeEach(function(){
			$scope = {};
			controller = $controller('safeCtrl', { $scope: $scope });
		});
		
		// FIRST TEST
		it('verify the pagination : number of entries per page', function(){
			// ASSERTION
			expect($scope.itemsByPage.value).toEqual(5);
			console.log("TEST 1 : IT REALLY 5 ROWS PER PAGE")
		});
		// SECOND TEST
		it('verify the data list : number of rows i the list', function(){
			//$scope.init();
			// ASSERTION
			expect($scope.rowCollection.length).toEqual(0);
			console.log("TEST 2 :THE LIST IS LOADED SUCCESSFULY")
		});
		it('should demonstrate using expect (200 status)', inject(function($http){
			$scope.valid = false;
			/* Code Under Test */
			$http.get('http://jsonplaceholder.typicode.com/posts')
				.success(function(data, status, headers, config){
					$scope.valid = true;
					$scope.response = data;
				}).error(function(data, status, headers, config){
					$scope.valid = false;
				});
			/* End */
			
			/* expect a get request to "internalapi/quotes" */
			$httpBackend.expectGET("http://jsonplaceholder.typicode.com/posts");
		
			/**$httpBackend
				.expect('GET', 'http://jsonplaceholder.typicode.com/posts')
				.respond(200, {});**/
				
			// expect($httpBackend.flush).not.toThrow();
			$httpBackend.flush;

			// NB we could still test the scope object properties as we did before...
			//expect($scope.valid).toBe(true);
			expect($scope.response).not.toBeNull();
			expect($scope.response).not.toEqual({ foo: 'bar' });
			console.log("TEST 3 :THE DATA IS RETURNED")
		}));
	});
});
