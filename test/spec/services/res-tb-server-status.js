'use strict';

describe('Service: resTbServerStatus', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resTbServerStatus;
  beforeEach(inject(function (_resTbServerStatus_) {
    resTbServerStatus = _resTbServerStatus_;
  }));

  it('should do something', function () {
    expect(!!resTbServerStatus).toBe(true);
  });

});
