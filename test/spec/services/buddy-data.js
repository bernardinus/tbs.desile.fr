'use strict';

describe('Service: buddyData', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var buddyData;
  beforeEach(inject(function (_buddyData_) {
    buddyData = _buddyData_;
  }));

  it('should do something', function () {
    expect(!!buddyData).toBe(true);
  });

});
