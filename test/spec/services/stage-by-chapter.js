'use strict';

describe('Service: stageByChapter', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var stageByChapter;
  beforeEach(inject(function (_stageByChapter_) {
    stageByChapter = _stageByChapter_;
  }));

  it('should do something', function () {
    expect(!!stageByChapter).toBe(true);
  });

});
