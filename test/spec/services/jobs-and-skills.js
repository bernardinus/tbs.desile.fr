'use strict';

describe('Service: jobsAndSkills', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var jobsAndSkills;
  beforeEach(inject(function (_jobsAndSkills_) {
    jobsAndSkills = _jobsAndSkills_;
  }));

  it('should do something', function () {
    expect(!!jobsAndSkills).toBe(true);
  });

});
