/* global require, dust, console, JSON */

/*
 * dust-i18n
 * https://bitbucket.org/manolakis/dust-i18n/wiki/Home
 *
 * Copyright (c) 2013 Manuel Martin
 * Licensed under the MIT license.
 */

(function(dust) {
	'use strict';

		/* Utility functions */
	var toString = Object.prototype.toString,
		_ = {
			isArray : Array.isArray || function(obj) {
				return toString.call(obj) === '[object Array]';
			}
		},

		/* Private i18n context */
		i18n_context = {
			selected: undefined,
			languages: {}
		};


	dust.i18n = {
		/* Set the current language. Selected language must be setted previously with setLanguages  */
		setLanguage: function(language) {
			if (i18n_context.languages[language] !== undefined) {
				i18n_context.selected = language;
			} else {
				throw "language '" + language + "' not available!";
			}
		},

		/* Set the available languages */
		setLanguages: function(languages) {
			if (_.isArray(languages)) {
				languages.forEach(function(language){
					if (i18n_context.languages[language] === undefined) {
						i18n_context.languages[language] = {};
					}
				});
			}
		}
	};

	dust.helpers.i18n = function(chunk, context, bodies, params){
		return chunk.write('Hello world!');
	};

	/* We are writing to the `dust` object so we don't need to return anything */
})(typeof exports === 'object' ? require('dustjs-linkedin') : dust);
