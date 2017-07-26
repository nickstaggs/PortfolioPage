angular.module('blogCtrl', []).controller('BlogController',
  ['$scope', '$http', function($scope, $http) {
    var init = function() {
      $http.get('/blogposts').then(function successCallBack(response) {
        //console.log(response);
        $scope.blogPosts = response.data;
      },
      function errorCallBack(response) {
        //console.log(response);
        //console.log("error");
      });
    };

    init();
  }]);
