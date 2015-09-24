'use strict';

describe('Controller: TimezoneListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var TimezoneListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimezoneListCtrl = $controller('TimezoneListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
