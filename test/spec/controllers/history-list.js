'use strict';

describe('Controller: HistoryListCtrl', function () {

  // load the controller's module
  beforeEach(module('tbsApp'));

  var HistoryListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistoryListCtrl = $controller('HistoryListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
