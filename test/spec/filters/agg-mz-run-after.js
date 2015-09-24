'use strict';

describe('Filter: aggMzRunAfter', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var aggMzRunAfter;
  beforeEach(inject(function ($filter) {
    aggMzRunAfter = $filter('aggMzRunAfter');
  }));

  it('should return the input prefixed with "aggMzRunAfter filter:"', function () {
    var text = 'angularjs';
    expect(aggMzRunAfter(text)).toBe('aggMzRunAfter filter: ' + text);
  });

});
