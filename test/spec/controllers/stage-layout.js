'use strict';

describe('Controller: StageLayoutCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var StageLayoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StageLayoutCtrl = $controller('StageLayoutCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
