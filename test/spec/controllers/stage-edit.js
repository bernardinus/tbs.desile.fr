'use strict';

describe('Controller: StageEditCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var StageEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StageEditCtrl = $controller('StageEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
