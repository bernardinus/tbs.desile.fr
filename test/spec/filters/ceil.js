'use strict';

describe('Filter: ceil', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var ceil;
  beforeEach(inject(function ($filter) {
    ceil = $filter('ceil');
  }));

  it('should return the input prefixed with "ceil filter:"', function () {
    var text = 'angularjs';
    expect(ceil(text)).toBe('ceil filter: ' + text);
  });

});
