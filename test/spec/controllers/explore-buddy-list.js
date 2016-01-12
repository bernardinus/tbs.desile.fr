'use strict';

describe('Controller: ExploreBuddyListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreBuddyListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreBuddyListCtrl = $controller('ExploreBuddyListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});