(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

		HomeController.$inject = ['$scope','$location','$anchorScroll','$routeParams'];

		function HomeController($scope, $location, $anchorScroll, $routeParams) {

			$('.parallax').parallax();
			$('.slider').slider();
		}
})();
