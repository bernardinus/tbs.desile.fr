'use strict';

describe('Controller: ExploreBuddiesEvolutionDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreBuddiesEvolutionDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreBuddiesEvolutionDetailCtrl = $controller('ExploreBuddiesEvolutionDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
