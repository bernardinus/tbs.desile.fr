'use strict';

describe('Service: skillDetail', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var skillDetail;
  beforeEach(inject(function (_skillDetail_) {
    skillDetail = _skillDetail_;
  }));

  it('should do something', function () {
    expect(!!skillDetail).toBe(true);
  });

});
