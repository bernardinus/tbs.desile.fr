'use strict';

describe('Service: resRebirth', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resRebirth;
  beforeEach(inject(function (_resRebirth_) {
    resRebirth = _resRebirth_;
  }));

  it('should do something', function () {
    expect(!!resRebirth).toBe(true);
  });

});
