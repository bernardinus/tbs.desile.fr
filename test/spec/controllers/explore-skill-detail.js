'use strict';

describe('Controller: ExploreSkillDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ExploreSkillDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreSkillDetailCtrl = $controller('ExploreSkillDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
