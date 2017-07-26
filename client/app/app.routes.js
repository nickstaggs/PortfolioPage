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
			templateUrl: '/app/blog/blog.html',
			controller: 'BlogController'
		})

		// blogPost route
		.when('/blog/:blogId', {
			templateUrl: '/app/blogPost/blogPost.html',
			controller: 'BlogPostController'
		})

		.when('/WriteBlogPost', {
			templateUrl: '/app/writeBlogPost/writeBlogPost.html',
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
