angular.module('MainCtrl', []).controller('MainController', ['$scope','$location','$anchorScroll','$routeParams',
												                             function($scope, $location, $anchorScroll, $routeParams) {

	 $('.parallax').parallax();
	 $('.slider').slider();
}]);
