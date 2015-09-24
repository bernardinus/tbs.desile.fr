'use strict';

describe('Service: resJob', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resJob;
  beforeEach(inject(function (_resJob_) {
    resJob = _resJob_;
  }));

  it('should do something', function () {
    expect(!!resJob).toBe(true);
  });

});
