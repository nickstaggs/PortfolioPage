angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
																function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: '/app/home/home.html',
			controller: 'HomeController'
		})

		.when('/resume', {
			templateUrl: '/app/resume/pdfRenderer.html',
			controller: 'ResumeController'
		})

		.when('/login', {
			templateUrl: '/app/login/login.html',
			controller: 'LoginController'
		})

		// blog route
		.when('/blog', {
			templateUrl: '/app/blog/blog.html'
		})

		// blogPost route
		.when('/blog/:blogUrl', {
			templateUrl: '/app/blog/blogPost/blogPost.html'
		})

		.when('/WriteBlogPost', {
			templateUrl: '/app/writeBlogPost/writeBlogPost.html',
			controller: 'WriteBlogPostController'
		})

		.otherwise({
			templateUrl: '/app/error/404.html',
			controller: 'ErrorController'
		});

    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);
