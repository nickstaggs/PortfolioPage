(function() {
  'use strict';

  angular
    .module('appRun', [])
    .run(AppRun);

    AppRun.$inject = ['$rootScope','$location','$anchorScroll','$routeParams', '$window'];

    function AppRun($rootScope, $location, $anchorScroll, $routeParams, $window) {


      $window.ga('create', 'UA-102927018-1', 'auto');

      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();

        $window.ga('send', 'pageview', $location.path());
      });
    }
})();
