angular.module('loginService', []).factory('Users', ['$http', function($http) {
  return {
    login : function() {
      return $http.post('/validateUser', loginCreds);
    }
  }
}]);
