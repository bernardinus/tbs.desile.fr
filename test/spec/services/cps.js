'use strict';

describe('Service: cps', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var cps;
  beforeEach(inject(function (_cps_) {
    cps = _cps_;
  }));

  it('should do something', function () {
    expect(!!cps).toBe(true);
  });

});
