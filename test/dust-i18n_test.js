'use strict';
var dust = require('dustjs-linkedin');
require('../lib/dust-i18n.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['dust i18n helper'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'hello world': function(test) {
    test.expect(1);
    // tests here
    var compiled = dust.compile("Hello {name}!", "hello world");
    dust.loadSource(compiled);

    dust.render("hello world", {name:'world'}, function(err, out) {
      test.equal(out, 'Hello world!', 'should be Hello world!');
      test.done();
    });
  }
};
