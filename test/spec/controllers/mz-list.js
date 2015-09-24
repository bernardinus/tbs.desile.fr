'use strict';

describe('Controller: MzListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var MzListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MzListCtrl = $controller('MzListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
