'use strict';

describe('Controller: SkillListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var SkillListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SkillListCtrl = $controller('SkillListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
