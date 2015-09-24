'use strict';

describe('Controller: CpsListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var CpsListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CpsListCtrl = $controller('CpsListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
