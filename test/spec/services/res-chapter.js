'use strict';

describe('Service: resChapter', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var resChapter;
  beforeEach(inject(function (_resChapter_) {
    resChapter = _resChapter_;
  }));

  it('should do something', function () {
    expect(!!resChapter).toBe(true);
  });

});
