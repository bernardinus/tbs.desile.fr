'use strict';

describe('Filter: job1Average', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var job1Average;
  beforeEach(inject(function ($filter) {
    job1Average = $filter('job1Average');
  }));

  it('should return the input prefixed with "job1Average filter:"', function () {
    var text = 'angularjs';
    expect(job1Average(text)).toBe('job1Average filter: ' + text);
  });

});
