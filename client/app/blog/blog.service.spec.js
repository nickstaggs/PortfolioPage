'use strict';

describe('BlogService', function() {
  var BlogService, scope;

  beforeEach(angular.mock.module('app.blog'));

  beforeEach(inject(function ($rootScope, $httpBackend, $q) {
    scope = $rootScope.$new();

    inject(function($injector) {
      BlogService = $injector.get('BlogService');
    });
  }));

  it('should exist', function() {
    expect(BlogService).toBeDefined();
  });
});
