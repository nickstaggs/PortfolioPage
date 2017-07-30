(function() {
  'use strict';

  angular
    .module('app.blog')
    .factory('BlogService', BlogService);

    BlogService.$inject = ['$http'];

    function BlogService($http) {

      return {
        getBlogPosts: getBlogPosts
      };

      function getBlogPosts() {
        return $http.get('/api/blogPosts')
          .then(successCallBack)
          .catch(errorCallBack);

        function successCallBack(response) {
          console.log(response);
          return response.data;
        }

        function errorCallBack(response) {
          console.log(response);
        }
      }
    }
})();
