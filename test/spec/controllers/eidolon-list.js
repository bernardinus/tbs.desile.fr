'use strict';

describe('Controller: EidolonListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var EidolonListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EidolonListCtrl = $controller('EidolonListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
