'use strict';

describe('Service: charStageExpected', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var charStageExpected;
  beforeEach(inject(function (_charStageExpected_) {
    charStageExpected = _charStageExpected_;
  }));

  it('should do something', function () {
    expect(!!charStageExpected).toBe(true);
  });

});
