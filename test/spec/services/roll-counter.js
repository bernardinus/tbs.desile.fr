'use strict';

describe('Service: rollCounter', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var rollCounter;
  beforeEach(inject(function (_rollCounter_) {
    rollCounter = _rollCounter_;
  }));

  it('should do something', function () {
    expect(!!rollCounter).toBe(true);
  });

});
