angular.module('appRun', []).run(function($rootScope, $location, $anchorScroll, $routeParams) {
  
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();
  });
})
