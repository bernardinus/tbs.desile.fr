'use strict';

describe('Service: dailyQuest', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var dailyQuest;
  beforeEach(inject(function (_dailyQuest_) {
    dailyQuest = _dailyQuest_;
  }));

  it('should do something', function () {
    expect(!!dailyQuest).toBe(true);
  });

});
