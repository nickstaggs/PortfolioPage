'use strict';

describe('WriteBlogPostController', function() {
  var WriteBlogPostController, vm, scope, BlogService;

  beforeEach(angular.mock.module('app.blog'));

  beforeEach(inject(function ($rootScope, $controller, $q) {
    scope = $rootScope.$new();

    BlogService = {
      postBlogPost: function(post) {}
    };

    spyOn(BlogService, 'postBlogPost').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({fileName: 'foo'});
        return deferred.promise;
    });

    vm = $controller('WriteBlogPostController', {'$scope': scope, BlogService: BlogService});
  }));

  it('Should exist', function() {
    expect(vm).toBeDefined();
  });

  it('Should call BlogService', function() {
    vm.title = 'title';
    vm.submit();

    expect(BlogService.postBlogPost).toHaveBeenCalled();
  });
});
