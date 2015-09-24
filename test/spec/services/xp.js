'use strict';

describe('Service: xp', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var xp;
  beforeEach(inject(function (_xp_) {
    xp = _xp_;
  }));

  it('should do something', function () {
    expect(!!xp).toBe(true);
  });

});
