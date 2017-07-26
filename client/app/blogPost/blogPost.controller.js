angular.module('blogPostCtrl',[]).controller('BlogPostController',
  ['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {
    var initPost = function() {
      //console.log('/blogposts/' + $routeParams.blogId);
      $http.get('/blogposts/' + $routeParams.blogId).then(function successCallBack(response) {
        //console.log('inside');
        $scope.post = response.data;
        //console.log(response);
      },
      function errorCallBack(response) {
        //console.log('error');
        //console.log(response);
      });
    };

    initPost();
  }]);
