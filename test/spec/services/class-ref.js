'use strict';

describe('Service: classRef', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var classRef;
  beforeEach(inject(function (_classRef_) {
    classRef = _classRef_;
  }));

  it('should do something', function () {
    expect(!!classRef).toBe(true);
  });

});
