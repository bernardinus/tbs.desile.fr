'use strict';

describe('Filter: parseInt', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var parseInt;
  beforeEach(inject(function ($filter) {
    parseInt = $filter('parseInt');
  }));

  it('should return the input prefixed with "parseInt filter:"', function () {
    var text = 'angularjs';
    expect(parseInt(text)).toBe('parseInt filter: ' + text);
  });

});
