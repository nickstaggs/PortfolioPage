(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','LoginService','$location'];

    function LoginController($scope, LoginService, $location) {
      let vm = this;
      vm.credentials = {};

      vm.submit = submit;

      function submit() {

        vm.credentials = {username:vm.username, password:vm.password};

        return LoginService.getUser(vm.credentials).then((data) => {
          $location.path(data.redirect);
        });
      }
    }
})();
