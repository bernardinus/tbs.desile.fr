'use strict';

describe('Controller: SkillBoostDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var SkillBoostDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SkillBoostDetailCtrl = $controller('SkillBoostDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
