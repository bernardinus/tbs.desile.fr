'use strict';

describe('Service: resCharacter', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resCharacter;
  beforeEach(inject(function (_resCharacter_) {
    resCharacter = _resCharacter_;
  }));

  it('should do something', function () {
    expect(!!resCharacter).toBe(true);
  });

});
