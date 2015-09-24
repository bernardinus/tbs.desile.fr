'use strict';

describe('Service: resBuddy', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resBuddy;
  beforeEach(inject(function (_resBuddy_) {
    resBuddy = _resBuddy_;
  }));

  it('should do something', function () {
    expect(!!resBuddy).toBe(true);
  });

});
