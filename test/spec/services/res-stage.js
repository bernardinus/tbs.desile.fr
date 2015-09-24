'use strict';

describe('Service: resStage', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resStage;
  beforeEach(inject(function (_resStage_) {
    resStage = _resStage_;
  }));

  it('should do something', function () {
    expect(!!resStage).toBe(true);
  });

});
