angular.module('appRun', []).run(['$rootScope','$location','$anchorScroll','$routeParams',
                          function($rootScope, $location, $anchorScroll, $routeParams) {

  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();
  });
}]);
