'use strict';

describe('Service: stage', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var stage;
  beforeEach(inject(function (_stage_) {
    stage = _stage_;
  }));

  it('should do something', function () {
    expect(!!stage).toBe(true);
  });

});
