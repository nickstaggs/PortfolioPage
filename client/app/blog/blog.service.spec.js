'use strict';

describe('BlogService', function() {
  var BlogService, scope, httpBackend;

  beforeEach(angular.mock.module('app.blog'));

  beforeEach(inject(function ($rootScope, _$httpBackend_, $q) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;

    inject(function($injector) {
      BlogService = $injector.get('BlogService');
    });
  }));

  it('should exist', function() {
    expect(BlogService).toBeDefined();
  });

  it('should get blog posts', function() {
    let returnData = "data";

    httpBackend.expectGET("/api/blogPosts").respond(returnData);

    let returnedPromise = BlogService.getBlogPosts();

    let result;
    returnedPromise.then(function(response) {
      result = response;
    });

    httpBackend.flush();

    expect(result).toEqual(returnData);
  });

  it('should get a blog post', function() {
    let returnData = "data";
    let urlSlug = "data";

    httpBackend.expectGET("/api/blogPosts/" + urlSlug).respond(returnData);

    let returnedPromise = BlogService.getBlogPost(urlSlug);

    let result;
    returnedPromise.then(function(response) {
      result = response;
    });

    httpBackend.flush();

    expect(result).toEqual(returnData);
  });

  it('should post a blogpost', function() {
    httpBackend.expectPOST("/api/blogPosts/");

    BlogService.postBlogPost({post: 'post'});
  });
});
