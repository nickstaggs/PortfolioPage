'use strict';

describe('BlogController', function() {

  var blogController;
  var blogServiceMock;
  var $rootScope;
  module('app.blog');

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('myController', {
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
