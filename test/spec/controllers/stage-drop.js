'use strict';

describe('Controller: StageDropCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var StageDropCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StageDropCtrl = $controller('StageDropCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
