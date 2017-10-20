'use strict';

describe('BlogPostController', function() {
  var BlogPostController, vm, scope, BlogService;

  beforeEach(angular.mock.module('app.blog'));

  beforeEach(inject(function ($rootScope, $controller, $q) {
    scope = $rootScope.$new();

    BlogService = {
      getBlogPost: function(blogPostSlug) {}
    };

    spyOn(BlogService, 'getBlogPost').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve('foo');
        return deferred.promise;
    });

    vm = $controller('BlogPostController', {'$scope': scope, BlogService: BlogService, '$routeParams': {blogId: 'foo'}});
  }));

  it('Should exist', function() {
    expect(vm).toBeDefined();
  });

  it('Should call BlogService', function() {
    //routeParams.blogId = 'id';
    vm.getBlogPost();

    expect(BlogService.getBlogPost).toHaveBeenCalled();
  });

  it('Should set blogPosts returned by the service to vm.blogPosts', function() {
    //routeParams.blogId = 'id';
    vm.getBlogPost();
    scope.$apply();
    expect(vm.blogPost).toEqual('foo');
  });
});
