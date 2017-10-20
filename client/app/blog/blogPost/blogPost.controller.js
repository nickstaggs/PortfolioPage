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
        getBlogPost().then();
      };

      function getBlogPost() {
        return BlogService.getBlogPost($routeParams.blogId)
          .then(function(data) {
            vm.blogPost = data;
            return vm.blogPost;
          });
      }
    }
})();
