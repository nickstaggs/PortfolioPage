'use strict';

describe('LoginController', function() {
  var LoginController, vm, scope, LoginService;

  beforeEach(angular.mock.module('app.login'));

  beforeEach(inject(function ($rootScope, $controller, $q) {
    scope = $rootScope.$new();

    LoginService = {
      getUser: function(credentials) {}
    };

    spyOn(LoginService, 'getUser').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({fileName: 'foo'});
        return deferred.promise;
    });

    vm = $controller('LoginController', {'$scope': scope, LoginService: LoginService});
  }));

  it('Should exist', function() {
    expect(vm).toBeDefined();
  });

  it('Should call BlogService', function() {
    vm.username = 'user';
    vm.submit();

    expect(LoginService.getUser).toHaveBeenCalled();
  });
});
