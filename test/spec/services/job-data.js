'use strict';

describe('Service: jobData', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var jobData;
  beforeEach(inject(function (_jobData_) {
    jobData = _jobData_;
  }));

  it('should do something', function () {
    expect(!!jobData).toBe(true);
  });

});
