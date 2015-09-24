'use strict';

describe('Filter: job3Average', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var job3Average;
  beforeEach(inject(function ($filter) {
    job3Average = $filter('job3Average');
  }));

  it('should return the input prefixed with "job3Average filter:"', function () {
    var text = 'angularjs';
    expect(job3Average(text)).toBe('job3Average filter: ' + text);
  });

});
