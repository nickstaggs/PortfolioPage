angular.module('LoginCtrl', []).controller('LoginController',
  ['$scope','$http','$location', function($scope, $http, $location) {

    $scope.submit = function() {

      var credentials = {username:this.username, password:this.password};
      //console.log(credentials);

      $http.post('/user', credentials).then(function successCallBack(response) {
        //console.log("successCallBack");
        //console.log(response);
        $location.path(response.data.redirect);
      },

      function errorCallBack(response) {
        //console.log(response);
        //console.log("errorCallBack");
      });
    }
}]);
