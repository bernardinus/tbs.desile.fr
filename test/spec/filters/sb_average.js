'use strict';

describe('Filter: sbAverage', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var sbAverage;
  beforeEach(inject(function ($filter) {
    sbAverage = $filter('sbAverage');
  }));

  it('should return the input prefixed with "sbAverage filter:"', function () {
    var text = 'angularjs';
    expect(sbAverage(text)).toBe('sbAverage filter: ' + text);
  });

});
