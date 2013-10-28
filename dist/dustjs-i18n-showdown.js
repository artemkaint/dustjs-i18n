/*! dustjs-i18n - v0.0.1 - 2013-10-28
* https://bitbucket.org/manolakis/dustjs-i18n
* Copyright (c) 2013 Manuel Martin; Licensed MIT */
(function(dust, Showdown) {
	'use strict';

	dust.i18n.addFilter('m', function(text){
		return (typeof Showdown !== undefined) ? (new Showdown.converter()).makeHtml(text) : text;
	});


})(typeof exports === 'object' ? require('dustjs-linkedin') : dust,
	typeof exports === 'object' ? require('showdown') : Showdown);
