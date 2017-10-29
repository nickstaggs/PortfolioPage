(function() {
	'use strict';

	angular
		.module('homeCtrl')
		.controller('HomeController', HomeController);

		HomeController.$inject = ['$scope','$location','$anchorScroll','$routeParams'];

		function HomeController($scope, $location, $anchorScroll, $routeParams) {

			 $('.parallax').parallax();
			 $('.slider').slider();
		 }
})();
