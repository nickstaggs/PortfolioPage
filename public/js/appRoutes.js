angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'MainController'
		})

		.when('/resume', {
			templateUrl: 'templates/pdfRenderer.html',
			controller: 'ResumeController'
		})

		.otherwise({
			templateUrl: 'templates/404.html',
			controller: 'ErrorController'
		})

    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);
