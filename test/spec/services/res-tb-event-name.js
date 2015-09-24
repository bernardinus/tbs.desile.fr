'use strict';

describe('Service: resTbEventName', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resTbEventName;
  beforeEach(inject(function (_resTbEventName_) {
    resTbEventName = _resTbEventName_;
  }));

  it('should do something', function () {
    expect(!!resTbEventName).toBe(true);
  });

});
