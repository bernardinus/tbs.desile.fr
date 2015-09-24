'use strict';

describe('Controller: MzEditCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var MzEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MzEditCtrl = $controller('MzEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
