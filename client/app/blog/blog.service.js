(function() {
  'use strict';

  angular
    .module('app.blog')
    .service('BlogService', BlogService);

    BlogService.$inject = ['$http'];

    function BlogService($http) {
      var service = {
        getBlogPosts: getBlogPosts
      };

      return service;

      function getBlogPosts() {
        return $http.get('/api/blogPosts')
          .then(successCallBack)
          .catch(errorCallBack);

        function successCallBack(response) {
          return response.data;
        }

        function errorCallBack(response) {

        }
      }
    }
})();
