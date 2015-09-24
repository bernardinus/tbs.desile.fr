'use strict';

describe('Controller: CharacterListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var CharacterListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CharacterListCtrl = $controller('CharacterListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
