var moment = require('moment');

angular.module('BlogPostCtrl',[]).controller('BlogPostController',
  ['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {
    var initPost = function() {
      console.log('/blogposts/' + $routeParams.blogId);
      $http.get('/blogposts/' + $routeParams.blogId).then(function successCallBack(response) {
        console.log('inside');
        response.data.datePosted = moment(response.data.datePosted).format('MMMM Do YYYY, h:mm:ss a');
        $scope.post = response.data;
        console.log(response);
      },
      function errorCallBack(response) {
        console.log('error');
        console.log(response);
      });
    };

    initPost();
  }]);
