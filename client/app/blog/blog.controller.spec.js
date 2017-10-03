'use strict';

describe('BlogController', function() {

  var blogController;
  var blogServiceMock;
  var $rootScope;
  angular.mock.module('app.blog');

  beforeEach(inject(function($rootScope, $controller) {
    var scope = $rootScope.$new();
    var ctrl = $controller('BlogController', {
       $scope: scope
    });



    var expectedCollection = [
        { id: 1, name: 'Gwen' },
        { id: 2, name: 'John' }
      ];
}));

  it('Sets controller variable to object containing all blogPosts', done => {

    const server = sinon.fakeServer.create();

    server.respondWith('GET', '/api/blogPosts', [
      200,
      { 'Content-Type': 'application/json' },
      '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
    ]);

    ctrl.getBlogPosts();

    server.respond();
    server.restore();

    expect(ctrl.blogPosts.toJSON()).to.eql(expectedCollection);
  });
});
