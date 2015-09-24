'use strict';

describe('Controller: StageListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var StageListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StageListCtrl = $controller('StageListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
