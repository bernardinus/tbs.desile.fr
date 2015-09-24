'use strict';

describe('Service: resBuddyEvolution', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resBuddyEvolution;
  beforeEach(inject(function (_resBuddyEvolution_) {
    resBuddyEvolution = _resBuddyEvolution_;
  }));

  it('should do something', function () {
    expect(!!resBuddyEvolution).toBe(true);
  });

});
