'use strict';

describe('Controller: ExploreRebirthListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreRebirthListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreRebirthListCtrl = $controller('ExploreRebirthListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
