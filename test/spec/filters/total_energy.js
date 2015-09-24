'use strict';

describe('Filter: totalEnergy', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var totalEnergy;
  beforeEach(inject(function ($filter) {
    totalEnergy = $filter('totalEnergy');
  }));

  it('should return the input prefixed with "totalEnergy filter:"', function () {
    var text = 'angularjs';
    expect(totalEnergy(text)).toBe('totalEnergy filter: ' + text);
  });

});
