(function() {
  'use strict';

  angular
    .module('app.blog')
    .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', 'BlogService'];

    function BlogController($scope, BlogService) {
      var vm = this;

      vm.blogPosts = [];
      vm.getBlogPosts = getBlogPosts;

      initBlog();

      function initBlog() {
        console.log("running init");
        getBlogPosts().then();
        console.log(vm.blogPosts);
      };

      function getBlogPosts() {
        return BlogService.getBlogPosts()
          .then(function(data) {
            vm.blogPosts = data;
            return vm.blogPosts;
          });
      }
    }
})();
