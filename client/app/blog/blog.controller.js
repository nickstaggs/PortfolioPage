(function() {
  'use strict';

  angular
    .module('app.blog')
    .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', 'BlogService'];

    function BlogController($scope, BlogService) {
      var vm = this;
      vm.blogPosts = [];

      init();

      function init() {
        vm.blogPosts = getBlogPosts();
      };

      function getBlogPosts() {
        return BlogService.getBlogPosts().then(function(data) {
          vm.blogPosts = data;
          return vm.blogPosts;
        });
      }
    }
})();
