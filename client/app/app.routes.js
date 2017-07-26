angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
																function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: '/home/home.html',
			controller: 'HomeController'
		})

		.when('/resume', {
			templateUrl: '/resume/pdfRenderer.html',
			controller: 'ResumeController'
		})

		.when('/login', {
			templateUrl: '/login/login.html',
			controller: 'LoginController'
		})

		// blog route
		.when('/blog', {
			templateUrl: '/blog/blog.html',
			controller: 'BlogController'
		})

		// blogPost route
		.when('/blog/:blogId', {
			templateUrl: '/blogPost/blogPost.html',
			controller: 'BlogPostController'
		})

		.when('/WriteBlogPost', {
			templateUrl: '/writeBlogPost/writeBlogPost.html',
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
