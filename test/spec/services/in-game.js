'use strict';

describe('Service: inGame', function () {

  // load the service's module
  beforeEach(module('tbsApp'));

  // instantiate service
  var inGame;
  beforeEach(inject(function (_inGame_) {
    inGame = _inGame_;
  }));

  it('should do something', function () {
    expect(!!inGame).toBe(true);
  });

});
