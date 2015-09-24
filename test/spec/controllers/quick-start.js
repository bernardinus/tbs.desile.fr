'use strict';

describe('Controller: QuickStartCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var QuickStartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuickStartCtrl = $controller('QuickStartCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
