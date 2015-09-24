'use strict';

describe('Filter: jobCount', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var jobCount;
  beforeEach(inject(function ($filter) {
    jobCount = $filter('jobCount');
  }));

  it('should return the input prefixed with "jobCount filter:"', function () {
    var text = 'angularjs';
    expect(jobCount(text)).toBe('jobCount filter: ' + text);
  });

});
