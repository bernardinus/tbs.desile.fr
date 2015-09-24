'use strict';

describe('Service: itemStage', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var itemStage;
  beforeEach(inject(function (_itemStage_) {
    itemStage = _itemStage_;
  }));

  it('should do something', function () {
    expect(!!itemStage).toBe(true);
  });

});
