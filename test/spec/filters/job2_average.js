'use strict';

describe('Filter: job2Average', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var job2Average;
  beforeEach(inject(function ($filter) {
    job2Average = $filter('job2Average');
  }));

  it('should return the input prefixed with "job2Average filter:"', function () {
    var text = 'angularjs';
    expect(job2Average(text)).toBe('job2Average filter: ' + text);
  });

});
