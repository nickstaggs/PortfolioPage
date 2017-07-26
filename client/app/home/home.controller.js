angular.module('homeCtrl', []).controller('HomeController', ['$scope','$location','$anchorScroll','$routeParams',
												                             function($scope, $location, $anchorScroll, $routeParams) {

	 $('.parallax').parallax();
	 $('.slider').slider();
}]);
