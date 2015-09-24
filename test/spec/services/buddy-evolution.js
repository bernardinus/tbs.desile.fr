'use strict';

describe('Service: buddyEvolution', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var buddyEvolution;
  beforeEach(inject(function (_buddyEvolution_) {
    buddyEvolution = _buddyEvolution_;
  }));

  it('should do something', function () {
    expect(!!buddyEvolution).toBe(true);
  });

});
