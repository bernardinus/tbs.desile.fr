'use strict';

describe('Service: skillBoostOpt', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var skillBoostOpt;
  beforeEach(inject(function (_skillBoostOpt_) {
    skillBoostOpt = _skillBoostOpt_;
  }));

  it('should do something', function () {
    expect(!!skillBoostOpt).toBe(true);
  });

});
