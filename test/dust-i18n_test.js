'use strict';
var dust;

exports['dust i18n helper'] = {

  setUp: function(done) {
    dust = require('dustjs-linkedin');
    require('../lib/dust-i18n.js');

    done();
  },

  'it should throw exception if selected language is not setted': function(test) {
    test.expect(1);
    
    test.throws(function(){
      dust.i18n.setLanguage('es_ES');
    }, "language 'es_ES' not available!");

    test.done();
  },

  'it should not throw exception if selected language is setted': function(test) {
    test.expect(1);

    dust.i18n.setLanguages(['es_ES']);
    
    test.doesNotThrow(function() {
      dust.i18n.setLanguage(['es_ES']);
    });

    test.done();
  }  

  /*
  'it should throw exception if language is not setted': function(test) {
    test.expect(1);
    // tests here
    var compiled = dust.compile('{@i18n key="hello_world"/}', 'hello_world');
    dust.loadSource(compiled);

    dust.render('hello_world', {}, function(err, out) {
      test.equal(out, 'Hello world!', 'should be Hello world!');
      test.done();
    });
  }
  */
};
