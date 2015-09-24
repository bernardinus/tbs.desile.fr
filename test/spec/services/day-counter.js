'use strict';

describe('Service: dayCounter', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var dayCounter;
  beforeEach(inject(function (_dayCounter_) {
    dayCounter = _dayCounter_;
  }));

  it('should do something', function () {
    expect(!!dayCounter).toBe(true);
  });

});
