# DustJS - i18n

**Dustjs-i18n** is a Helper to provide i18n inside DustJS templates.

## Basic usage

### Installation

#### CommonJS/AMD/Node environments

	var dust = require('dustjs-linkedin');
	require('dustjs-helpers');
	require('dustjs-i18n');

#### Browser

Include the dustjs-i18n file after including dust.js and dust-helpers.js

	<script src="dust-core.js" type="text/javascript"></script>
	<script src="dust-helpers.js" type="text/javascript"></script>
	<script src="dustjs-i18n.js" type="text/javascript"></script>

### Initialization

Set available languages in your application.

	dust.i18n.setLanguages(['es_ES', 'en_EN']);

First language in array is setted as default language, but you can change it programmatically.

	dust.i18n.setLanguage('en_EN');

Now you need to load the texts.

	dust.i18n.add('es_ES',{
		'application': 'aplicación',
		'name': 'nombre',
		'greeting': 'hola {name}' 
	});
	
	dust.i18n.add('en_EN',{
		'application': 'application',
		'name': 'name',
		'greeting': 'hello {name}' 
	});

### Usage

With the previous example:

	{@i18n $key="name"/}

will produce the exit

	nombre // if 'es_ES' is the selected language
	
	name // if 'en_EN' is the selected language

#### Parameters

You can use parametrized paragraphs

	{@i18n $key="greeting" name="Manuel" /}
	
will produce

	hola Manuel

Also, it could resolve parameters from context:

*template.html*

	{@i18n $key="greeting" name="{heroName}"/}
	
*app.js*

	dust.render('template', {heroName: 'Spiderman'}, function(err, out){
		$('#content').innerHTML(out);
	});
	
will produce

	hola Spiderman

