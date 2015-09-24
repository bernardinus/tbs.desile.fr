'use strict';

describe('Controller: ExploreBuddyEvolutionGraphCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreBuddyEvolutionGraphCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreBuddyEvolutionGraphCtrl = $controller('ExploreBuddyEvolutionGraphCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
