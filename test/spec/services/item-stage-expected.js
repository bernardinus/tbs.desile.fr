'use strict';

describe('Service: itemStageExpected', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var itemStageExpected;
  beforeEach(inject(function (_itemStageExpected_) {
    itemStageExpected = _itemStageExpected_;
  }));

  it('should do something', function () {
    expect(!!itemStageExpected).toBe(true);
  });

});
