'use strict';

describe('Service: charDetail', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var charDetail;
  beforeEach(inject(function (_charDetail_) {
    charDetail = _charDetail_;
  }));

  it('should do something', function () {
    expect(!!charDetail).toBe(true);
  });

});
