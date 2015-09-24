'use strict';

describe('Filter: aggHave', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var aggHave;
  beforeEach(inject(function ($filter) {
    aggHave = $filter('aggHave');
  }));

  it('should return the input prefixed with "aggHave filter:"', function () {
    var text = 'angularjs';
    expect(aggHave(text)).toBe('aggHave filter: ' + text);
  });

});
