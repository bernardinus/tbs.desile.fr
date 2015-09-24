'use strict';

describe('Controller: AccountCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var AccountCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountCreateCtrl = $controller('AccountCreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
