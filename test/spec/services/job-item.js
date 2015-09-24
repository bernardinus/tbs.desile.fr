'use strict';

describe('Service: jobItem', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var jobItem;
  beforeEach(inject(function (_jobItem_) {
    jobItem = _jobItem_;
  }));

  it('should do something', function () {
    expect(!!jobItem).toBe(true);
  });

});
