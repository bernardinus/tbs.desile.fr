'use strict';

describe('Filter: positiveOrZero', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var positiveOrZero;
  beforeEach(inject(function ($filter) {
    positiveOrZero = $filter('positiveOrZero');
  }));

  it('should return the input prefixed with "positiveOrZero filter:"', function () {
    var text = 'angularjs';
    expect(positiveOrZero(text)).toBe('positiveOrZero filter: ' + text);
  });

});
