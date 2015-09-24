'use strict';

describe('Controller: ItemDropCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ItemDropCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemDropCtrl = $controller('ItemDropCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
