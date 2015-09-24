'use strict';

describe('Controller: XpListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var XpListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    XpListCtrl = $controller('XpListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
