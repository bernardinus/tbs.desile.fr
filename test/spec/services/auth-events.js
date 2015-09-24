'use strict';

describe('Service: authEvents', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var authEvents;
  beforeEach(inject(function (_authEvents_) {
    authEvents = _authEvents_;
  }));

  it('should do something', function () {
    expect(!!authEvents).toBe(true);
  });

});
