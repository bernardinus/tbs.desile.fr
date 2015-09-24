'use strict';

describe('Filter: aggMzRun', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var aggMzRun;
  beforeEach(inject(function ($filter) {
    aggMzRun = $filter('aggMzRun');
  }));

  it('should return the input prefixed with "aggMzRun filter:"', function () {
    var text = 'angularjs';
    expect(aggMzRun(text)).toBe('aggMzRun filter: ' + text);
  });

});
