'use strict';

describe('Controller: DisclaimerCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var DisclaimerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DisclaimerCtrl = $controller('DisclaimerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
