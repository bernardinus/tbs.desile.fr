'use strict';

describe('Service: resItem', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resItem;
  beforeEach(inject(function (_resItem_) {
    resItem = _resItem_;
  }));

  it('should do something', function () {
    expect(!!resItem).toBe(true);
  });

});
