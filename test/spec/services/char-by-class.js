'use strict';

describe('Service: charByClass', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var charByClass;
  beforeEach(inject(function (_charByClass_) {
    charByClass = _charByClass_;
  }));

  it('should do something', function () {
    expect(!!charByClass).toBe(true);
  });

});
