'use strict';

describe('Service: chapter', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var chapter;
  beforeEach(inject(function (_chapter_) {
    chapter = _chapter_;
  }));

  it('should do something', function () {
    expect(!!chapter).toBe(true);
  });

});
