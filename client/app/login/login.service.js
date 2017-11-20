(function() {
  'use strict';

  angular
    .module('app.login')
    .factory('LoginService', LoginService)

    LoginService.$inject = ['$http'];

    function LoginService($http) {
      let baseUrl = '/api/users';

      return {
        getUser: getUser
      };

      function getUser(credentials) {
        return $http.post(baseUrl, credentials)
          .then(successCallBack)
          .catch(errorCallBack);
      }

      function successCallBack(response) {
        return response.data;
      }

      function errorCallBack(response) {
        console.log("error");
        console.log(response);
      }

    }
})();
