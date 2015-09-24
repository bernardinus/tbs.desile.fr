'use strict';

describe('Service: resJobAndSkills', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resJobAndSkills;
  beforeEach(inject(function (_resJobAndSkills_) {
    resJobAndSkills = _resJobAndSkills_;
  }));

  it('should do something', function () {
    expect(!!resJobAndSkills).toBe(true);
  });

});
