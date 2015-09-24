'use strict';

describe('Filter: jobTotal', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var jobTotal;
  beforeEach(inject(function ($filter) {
    jobTotal = $filter('jobTotal');
  }));

  it('should return the input prefixed with "jobTotal filter:"', function () {
    var text = 'angularjs';
    expect(jobTotal(text)).toBe('jobTotal filter: ' + text);
  });

});
