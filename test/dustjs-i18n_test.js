(function(){
  'use strict';

  var dust = require('dustjs-linkedin'),
      compile = function(template, name){
        var compiled = dust.compile(template, name);
        dust.loadSource(compiled);
      };

  require('dustjs-helpers');
  require('../lib/dustjs-i18n.js');

  exports['dust i18n helper'] = {

    setUp: function(done) {
      dust.i18n.resetContext();

      // clears DustJS cache
      Object.keys(dust.cache).forEach(function(key){
        delete dust.cache[key];
      });

      done();
    },

    'it should throw exception if selected language is not setted': function(test) {
      test.expect(1);
    
      test.throws(function(){
        dust.i18n.setLanguage('es_ES');
      }, /language 'es_ES' not available/);

      test.done();
    },

    'it shouldn\'t throw exception if selected language is setted': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
    
      test.doesNotThrow(function() {
        dust.i18n.setLanguage(['es_ES']);
      });

      test.done();
    },

    'it should add keys to an available language': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola mundo!'
      });

      compile('{@i18n $key="test.hello_world"/}', 'hello_world');
      dust.render('hello_world', {}, function(err, out) {
        test.equal(out, '¡Hola mundo!', 'should be \'¡Hola mundo!\'');
        test.done();
      });
    },

    'it shouldn\'t add keys to an unavailable language': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['en_EN']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola mundo!'
      });

      compile('{@i18n $key="test.hello_world"/}', 'hello_world');
      dust.render('hello_world', {}, function(err, out) {
        test.equal(out, '', 'should be \'\'');
        test.done();
      });
    },

    'it should resolve keys from context': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola mundo!'
      });

      compile('{@i18n $key="{key}"/}', 'hello_world');
      dust.render('hello_world', {key: "test.hello_world"}, function(err, out) {
        test.equal(out, '¡Hola mundo!', 'should be \'¡Hola mundo!\'');
        test.done();
      });
    },

    'it should return \'\' if key is not provided': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola mundo!'
      });

      compile('{@i18n /}', 'hello_world');
      dust.render('hello_world', {}, function(err, out) {
        test.equal(out, '', 'should be \'\'');
        test.done();
      });
    },

    'it should resolve one parameter': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola {name}!'
      });

      compile('{@i18n $key="test.hello_world" name="mundo"/}', 'hello_world');      
      dust.render('hello_world', {}, function(err, out) {
        test.equal(out, '¡Hola mundo!', 'should be \'¡Hola mundo!\'');
        test.done();
      });
    },

    'it should resolve multiple parameters': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola {name} {surname}!'
      });

      compile('{@i18n $key="test.hello_world" name="Manuel" surname="Martín"/}', 'hello_world');      
      dust.render('hello_world', {}, function(err, out) {
        test.equal(out, '¡Hola Manuel Martín!', 'should be \'¡Hola Manuel Martín!\'');
        test.done();
      });
    },

    'it should resolve parameters from context': function(test) {
      test.expect(1);

      dust.i18n.setLanguages(['es_ES']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola {name} {surname}!'
      });

      compile('{@i18n $key="test.hello_world" name="{name}" surname="{surname}"/}', 'hello_world');      
      dust.render('hello_world', {name: 'Manuel', surname: 'Martín'}, function(err, out) {
        test.equal(out, '¡Hola Manuel Martín!', 'should be \'¡Hola Manuel Martín!\'');
        test.done();
      });
    },

    'it should change between setted languages': function(test) {
      test.expect(2);

      dust.i18n.setLanguages(['es_ES', 'en_EN']);
      dust.i18n.add('es_ES', {
        'test.hello_world' : '¡Hola {name} {surname}!'
      });
      dust.i18n.add('en_EN', {
        'test.hello_world' : 'Hello {name} {surname}!'
      });

      compile('{@i18n $key="test.hello_world" name="{name}" surname="{surname}"/}', 'hello_world');

      dust.render('hello_world', {name: 'Manuel', surname: 'Martín'}, function(err, out) {
        test.equal(out, '¡Hola Manuel Martín!', 'should be \'¡Hola Manuel Martín!\'');
        
        dust.i18n.setLanguage('en_EN');

        dust.render('hello_world', {name: 'Manuel', surname: 'Martín'}, function(err, out) {
          test.equal(out, 'Hello Manuel Martín!', 'should be \'¡Hola Manuel Martín!\'');
          test.done();  
        });
      });
    }

  };
})();