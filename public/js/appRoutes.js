angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'MainController'
		})

		.when('/resume', {
			templateUrl: 'templates/iframe.html',
			controller: 'ResumeController'
		})

    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);
