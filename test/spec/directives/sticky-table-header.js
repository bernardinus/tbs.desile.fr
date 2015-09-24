'use strict';

describe('Directive: stickyTableHeader', function () {

  // load the directive's module
  beforeEach(module('tbsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sticky-table-header></sticky-table-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stickyTableHeader directive');
  }));
});
