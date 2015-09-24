'use strict';

describe('Controller: ExploreCharacterDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreCharacterDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreCharacterDetailCtrl = $controller('ExploreCharacterDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
