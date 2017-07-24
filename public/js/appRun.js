angular.module('appRun', []).run(['$rootScope','$location','$anchorScroll','$routeParams', '$window',
                          function($rootScope, $location, $anchorScroll, $routeParams, $window) {


  $window.ga('create', 'UA-102927018-1', 'auto');

  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();

    $window.ga('send', 'pageview', $location.path());
  });
}]);
