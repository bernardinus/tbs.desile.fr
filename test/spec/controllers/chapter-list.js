'use strict';

describe('Controller: ChapterListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var ChapterListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChapterListCtrl = $controller('ChapterListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
