(function() {
  'use strict';

  angular
    .module('app.blog')
    .controller('WriteBlogPostController', WriteBlogPostController);

    WriteBlogPostController.$inject = ['$scope', 'BlogService'];

    function WriteBlogPostController($scope, BlogService) {
      let vm = this;
      vm.blogPost = {};

      vm.submit = submit;

      function submit() {

        vm.blogPost = {title:vm.title, fileName:vm.fileName, url:vm.url,
                      summary:vm.summary, tags:vm.tags};

        return BlogService.postBlogPost(vm.blogPost);
      }
    }
})();
