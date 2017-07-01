angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
																function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: '/templates/home.html',
			controller: 'MainController'
		})

		.when('/resume', {
			templateUrl: '/templates/pdfRenderer.html',
			controller: 'ResumeController'
		})

		.when('/login', {
			templateUrl: '/templates/login.html',
			controller: 'LoginController'
		})

		// blog route
		.when('/blog', {
			templateUrl: '/templates/blog.html',
			controller: 'BlogController'
		})

		// blogPost route
		.when('/blog/:blogId', {
			templateUrl: '/templates/blogPost.html',
			controller: 'BlogPostController'
		})

		.when('/WriteBlogPost', {
			templateUrl: '/templates/WriteBlogPost.html',
			controller: 'WriteBlogPostController'
		})

		.otherwise({
			templateUrl: '/templates/404.html',
			controller: 'ErrorController'
		});

    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);
