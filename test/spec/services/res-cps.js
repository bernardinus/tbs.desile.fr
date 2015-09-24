'use strict';

describe('Service: resCps', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resCps;
  beforeEach(inject(function (_resCps_) {
    resCps = _resCps_;
  }));

  it('should do something', function () {
    expect(!!resCps).toBe(true);
  });

});
