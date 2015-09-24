'use strict';

describe('Controller: ExploreCharacterListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreCharacterListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreCharacterListCtrl = $controller('ExploreCharacterListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
