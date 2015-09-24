'use strict';

describe('Service: userHistory', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var userHistory;
  beforeEach(inject(function (_userHistory_) {
    userHistory = _userHistory_;
  }));

  it('should do something', function () {
    expect(!!userHistory).toBe(true);
  });

});
