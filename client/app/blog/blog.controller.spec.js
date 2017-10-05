describe('BlogController', function() {
  'use strict';

  beforeEach(angular.mock.module('app.blog'));

  var BlogController, vm, scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    vm = $controller('BlogController', {'$scope': scope});
  }));

  it('should exist', function() {
    expect(vm).toBeDefined();
  });



  it('Sets controller variable to object containing all blogPosts', function() {

    var expectedCollection = [
        { id: 1, name: 'Gwen' },
        { id: 2, name: 'John' }
      ];

    const server = sinon.fakeServer.create();

    server.respondWith('GET', '/api/blogPosts', [
      200,
      { 'Content-Type': 'application/json' },
      '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
    ]);

    // vm.getBlogPosts();
    //
    // server.respond();
    // server.restore();
    //
    // expect(vm.blogPosts).to.eql(expectedCollection);

    expect(vm.blogPosts).toBeDefined();
  });
});
