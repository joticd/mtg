
var Browser = require('zombie');
var assert = require('assert');
var config = require('../config');

describe("visit", function() {
  before(function(done) {
    this.browser = new Browser();
    this.browser
      .visit("http://localhost:" + config.port)
      .then(done, done);
  });
  
  it("should load the index page", function() {
    assert.equal(this.browser.location.pathname, "/");
  });
});