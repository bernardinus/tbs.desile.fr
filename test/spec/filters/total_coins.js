'use strict';

describe('Filter: totalCoins', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var totalCoins;
  beforeEach(inject(function ($filter) {
    totalCoins = $filter('totalCoins');
  }));

  it('should return the input prefixed with "totalCoins filter:"', function () {
    var text = 'angularjs';
    expect(totalCoins(text)).toBe('totalCoins filter: ' + text);
  });

});
