angular.module('WriteBlogPostCtrl',[]).controller('WriteBlogPostController',
  ['$scope', '$http', function($scope, $http) {

    $scope.submit = function() {

      var post = { title:this.title, body:this.body, tags:this.tags, image:this.image};
      console.log(post);

      $http.post('/writeBlogPost', post).then(function successCallBack(response) {
        console.log("successCallBack");
      },

      function errorCallBack(response) {
        console.log(response);
        console.log("errorCallBack");
      });
    }
}]);
