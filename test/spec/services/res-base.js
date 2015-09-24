'use strict';

describe('Service: resBase', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resBase;
  beforeEach(inject(function (_resBase_) {
    resBase = _resBase_;
  }));

  it('should do something', function () {
    expect(!!resBase).toBe(true);
  });

});
