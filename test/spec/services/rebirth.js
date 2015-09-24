'use strict';

describe('Service: rebirth', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var rebirth;
  beforeEach(inject(function (_rebirth_) {
    rebirth = _rebirth_;
  }));

  it('should do something', function () {
    expect(!!rebirth).toBe(true);
  });

});
