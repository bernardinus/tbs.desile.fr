'use strict';

describe('Service: dailyBonus', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var dailyBonus;
  beforeEach(inject(function (_dailyBonus_) {
    dailyBonus = _dailyBonus_;
  }));

  it('should do something', function () {
    expect(!!dailyBonus).toBe(true);
  });

});
