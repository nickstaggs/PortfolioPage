'use strict';

describe('LoginService', function() {
  var LoginService, scope, httpBackend;

  beforeEach(angular.mock.module('app.login'));

  beforeEach(inject(function ($rootScope, _$httpBackend_, $q) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;

    inject(function($injector) {
      LoginService = $injector.get('LoginService');
    });
  }));

  it('should post a user', function() {
    httpBackend.expectPOST("/api/users/");

    LoginService.getUser({username: 'user'});
  });
});
