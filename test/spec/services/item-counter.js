'use strict';

describe('Service: itemCounter', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var itemCounter;
  beforeEach(inject(function (_itemCounter_) {
    itemCounter = _itemCounter_;
  }));

  it('should do something', function () {
    expect(!!itemCounter).toBe(true);
  });

});
