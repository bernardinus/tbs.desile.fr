'use strict';

describe('Filter: objectOrderBy', function () {

  // load the filter's module
  beforeEach(module('tbsApp'));

  // initialize a new instance of the filter before each test
  var objectOrderBy;
  beforeEach(inject(function ($filter) {
    objectOrderBy = $filter('objectOrderBy');
  }));

  it('should return the input prefixed with "objectOrderBy filter:"', function () {
    var text = 'angularjs';
    expect(objectOrderBy(text)).toBe('objectOrderBy filter: ' + text);
  });

});
