'use strict';

describe('Service: intermentFactory', function () {

  // load the service's module
  beforeEach(module('plottGisApp'));

  // instantiate service
  var intermentFactory;
  beforeEach(inject(function (_intermentFactory_) {
    intermentFactory = _intermentFactory_;
  }));

  it('should do something', function () {
    expect(!!intermentFactory).toBe(true);
  });

});
