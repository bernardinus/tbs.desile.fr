'use strict';

describe('Controller: JobListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var JobListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobListCtrl = $controller('JobListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
