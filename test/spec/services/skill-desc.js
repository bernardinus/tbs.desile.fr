'use strict';

describe('Service: skillDesc', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var skillDesc;
  beforeEach(inject(function (_skillDesc_) {
    skillDesc = _skillDesc_;
  }));

  it('should do something', function () {
    expect(!!skillDesc).toBe(true);
  });

});
