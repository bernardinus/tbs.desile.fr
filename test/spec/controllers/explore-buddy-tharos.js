'use strict';

describe('Controller: ExploreBuddyTharosCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreBuddyTharosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreBuddyTharosCtrl = $controller('ExploreBuddyTharosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
