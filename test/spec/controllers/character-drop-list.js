'use strict';

describe('Controller: CharacterDropListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var CharacterDropListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CharacterDropListCtrl = $controller('CharacterDropListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
