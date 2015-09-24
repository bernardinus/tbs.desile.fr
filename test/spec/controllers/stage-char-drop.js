'use strict';

describe('Controller: StageCharDropCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var StageCharDropCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StageCharDropCtrl = $controller('StageCharDropCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
