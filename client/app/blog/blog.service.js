(function() {
  'use strict';

  angular
    .module('app.blog')
    .factory('BlogService', BlogService);

    BlogService.$inject = ['$http'];

    function BlogService($http) {
      let baseUrl = '/api/blogPosts';

      return {
        getBlogPosts: getBlogPosts,
        getBlogPost: getBlogPost,
        postBlogPost: postBlogPost
      };

      function getBlogPosts() {
        return $http.get(baseUrl)
          .then(successCallBack)
          .catch(errorCallBack);
      }

      function getBlogPost(blogPostSlug) {
        return $http.get(baseUrl + "/" + blogPostSlug)
          .then(successCallBack)
          .catch(errorCallBack);
      }

      function postBlogPost(post) {
        return $http.post(baseUrl, post)
          .then(successCallBack)
          .catch(errorCallBack);
      }

      function successCallBack(response) {
        console.log("success");
        console.log(response);
        return response.data;
      }

      function errorCallBack(response) {
        console.log("error");
        console.log(response);
      }

  }
})();
