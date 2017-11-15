angular.module('writeBlogPostCtrl',[]).controller('WriteBlogPostController',
  ['$scope', '$http', function($scope, $http) {

    $scope.submit = function() {

      var post = { title:this.title, fileName:this.fileName, url:this.url, summary:this.summary, tags:this.tags};
      //console.log(post);

      $http.post('api/blogPosts', post).then(function successCallBack(response) {
        //console.log("successCallBack");
      },

      function errorCallBack(response) {
        //console.log(response);
        //console.log("errorCallBack");
      });
    }
}]);
