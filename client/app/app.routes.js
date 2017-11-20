(function() {
	'use strict';

	angular
		.module('appRoutes', [])
		.config(routes);

		routes.$inject = ['$routeProvider', '$locationProvider'];

		function routes($routeProvider, $locationProvider) {

			$routeProvider
				.when('/', {
					templateUrl: '/app/home/home.html'
				})

				.when('/resume', {
					templateUrl: '/app/resume/pdfRenderer.html'
				})

				.when('/login', {
					templateUrl: '/app/login/login.html'
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
					templateUrl: '/app/blog/writeBlogPost/writeBlogPost.html'
				})

				.otherwise({
					templateUrl: '/app/error/404.html'
				});

		    $locationProvider.html5Mode({
		    enabled: true,
		    requireBase: false
		  });
		}
})();
