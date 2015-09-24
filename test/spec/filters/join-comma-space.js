'use strict';

describe('Filter: joinCommaSpace', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var joinCommaSpace;
  beforeEach(inject(function ($filter) {
    joinCommaSpace = $filter('joinCommaSpace');
  }));

  it('should return the input prefixed with "joinCommaSpace filter:"', function () {
    var text = 'angularjs';
    expect(joinCommaSpace(text)).toBe('joinCommaSpace filter: ' + text);
  });

});
