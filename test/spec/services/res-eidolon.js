'use strict';

describe('Service: resEidolon', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resEidolon;
  beforeEach(inject(function (_resEidolon_) {
    resEidolon = _resEidolon_;
  }));

  it('should do something', function () {
    expect(!!resEidolon).toBe(true);
  });

});
