'use strict';

describe('BlogController', function() {

  var blogController;
  var blogServiceMock;
  var $rootScope;
  var $q;
  var deferredListResponse;
  var mockBlogPostList;

  beforeEach(function() {

    module('app.blog');

    blogServiceMock = jasmine.createSpyObj('BlogService', ['getBlogPosts']);
    mockBlogPostList = [{ id: '1'}, { id: '2' }, { id: '3'}];

    inject(function($controller, _$rootScope_, _$q_) {
      $rootScope = _$rootScope_;
      $q = _$q_;

      deferredListResponse = $q.defer();
      blogServiceMock.getBlogPosts.and.returnValue(deferredListResponse.promise);
      deferredListResponse.resolve(mockBlogPostList);

      blogController = $controller('BooksController', {
        BlogService: blogServiceMock
      });
 
      $rootScope.$apply();
    });
  });
});
