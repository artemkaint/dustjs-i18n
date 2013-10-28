(function(){
  'use strict';

  var dust = require('dustjs-linkedin'),
      compile = function(template, name){
        var compiled = dust.compile(template, name);
        dust.loadSource(compiled);
      };

  require('dustjs-helpers');
  require('showdown');
  require('../lib/dustjs-i18n.js');
  require('../lib/dustjs-i18n-showdown.js');

  exports['dustjs i18n showdown filter'] = {

    setUp: function(done) {
      dust.i18n.resetContext();

      // clears DustJS cache
      Object.keys(dust.cache).forEach(function(key){
        delete dust.cache[key];
      });

      done();
    },

    'it should resolve Markdown syntax if Showdown library is present': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '**¡Hola {name}!**'
      });

      compile('{@i18n $key="test.hello_world|m" name="mundo"/}', 'hello_world');

      dust.render('hello_world', {}, function(err, out) {
        test.equal(out, '<p><strong>¡Hola mundo!</strong></p>', 'should be \'<p><strong>¡Hola mundo!</strong></p>\'');
        test.done();  
      });
    }

  };
})();