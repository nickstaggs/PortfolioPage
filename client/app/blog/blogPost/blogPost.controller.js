(function() {
  'use strict';

  angular
    .module('app.blog')
    .controller('BlogPostController', BlogPostController);

    BlogPostController.$inject = ['$scope','BlogService', '$routeParams'];

    function BlogPostController($scope, BlogService, $routeParams) {
      let vm = this;
      vm.blogPost = {}

      vm.getBlogPost = getBlogPost;

      initPost();

      function initPost() {
        getBlogPost();
      };

      function getBlogPost() {
        return BlogService.getBlogPost($routeParams.blogUrl)
          .then(function(data) {
            vm.blogPost = data;
            return vm.blogPost;
          });
      }
    }
})();
