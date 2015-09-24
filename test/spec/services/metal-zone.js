'use strict';

describe('Service: metalZone', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var metalZone;
  beforeEach(inject(function (_metalZone_) {
    metalZone = _metalZone_;
  }));

  it('should do something', function () {
    expect(!!metalZone).toBe(true);
  });

});
