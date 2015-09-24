'use strict';

describe('Service: charStage', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var charStage;
  beforeEach(inject(function (_charStage_) {
    charStage = _charStage_;
  }));

  it('should do something', function () {
    expect(!!charStage).toBe(true);
  });

});
