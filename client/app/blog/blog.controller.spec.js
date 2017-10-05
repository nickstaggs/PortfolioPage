'use strict';

describe('BlogController', function() {
  var BlogController, vm, scope, BlogService;

  beforeEach(angular.mock.module('app.blog'));

  beforeEach(inject(function ($rootScope, $controller, $q) {
    scope = $rootScope.$new();

    BlogService = {
      getBlogPosts: function() {}
    };

    spyOn(BlogService, 'getBlogPosts').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve('foo');
        return deferred.promise;
    });

    vm = $controller('BlogController', {'$scope': scope, BlogService: BlogService});
  }));

  it('Should exist', function() {
    expect(vm).toBeDefined();
  });

  it('Should call BlogService', function() {
    vm.getBlogPosts();

    expect(BlogService.getBlogPosts).toHaveBeenCalled();
  });

  it('Should set blogPosts returned by the service to vm.blogPosts', function() {
    vm.getBlogPosts();
    scope.$apply();
    expect(vm.blogPosts).toEqual('foo');
  });
});
