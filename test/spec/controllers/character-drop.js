'use strict';

describe('Controller: CharacterDropCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var CharacterDropCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CharacterDropCtrl = $controller('CharacterDropCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
