'use strict';

describe('Controller: BuddyListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var BuddyListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuddyListCtrl = $controller('BuddyListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
