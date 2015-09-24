'use strict';

describe('Controller: ExploreRebirthDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreRebirthDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreRebirthDetailCtrl = $controller('ExploreRebirthDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
