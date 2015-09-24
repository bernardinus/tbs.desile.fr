'use strict';

describe('Controller: ItemCharacterDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ItemCharacterDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemCharacterDetailCtrl = $controller('ItemCharacterDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
