'use strict';

describe('Controller: BuddyDropListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var BuddyDropListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuddyDropListCtrl = $controller('BuddyDropListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});