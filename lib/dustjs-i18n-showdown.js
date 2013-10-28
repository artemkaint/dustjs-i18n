/* global require, dust, Showdown */
(function(dust, Showdown) {
	'use strict';

	dust.i18n.addFilter('m', function(text){
		return (typeof Showdown !== undefined) ? (new Showdown.converter()).makeHtml(text) : text;
	});


})(typeof exports === 'object' ? require('dustjs-linkedin') : dust,
	typeof exports === 'object' ? require('showdown') : Showdown);
