'use strict';

describe('Controller: ExploreListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreListCtrl = $controller('ExploreListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
