'use strict';

describe('Service: resSkill', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resSkill;
  beforeEach(inject(function (_resSkill_) {
    resSkill = _resSkill_;
  }));

  it('should do something', function () {
    expect(!!resSkill).toBe(true);
  });

});
