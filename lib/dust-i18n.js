/* global require, dust */
(function(dust) {
	'use strict';

		/* Utility functions */
	var toString = Object.prototype.toString,
		_ = {
			isArray : Array.isArray || function(obj) {
				return toString.call(obj) === '[object Array]';
			},
			isAvailable : function(language) {
				return i18nLanguages[language] !== undefined;
			}

		},
		i18nContext = {
			selected: undefined,
			languages: {}
		},
		i18nLanguages = i18nContext.languages;

	dust.i18n = {
		/* Clears all config and loaded keys */
		resetContext: function() {
			i18nContext.selected = undefined;
			Object.keys(i18nLanguages).forEach(function(language){
				delete i18nLanguages[language];
			});
		},

		/* Set the current language. Selected language must be setted previously with setLanguages  */
		setLanguage: function(language) {
			if (_.isAvailable(language)) {
				i18nContext.selected = language;
			} else {
				throw new Error("language '" + language + "' not available!");
			}
		},

		/* Set the available languages */
		setLanguages: function(languages) {
			if (_.isArray(languages)) {
				languages.forEach(function(language){
					if (!_.isAvailable(language)) {
						i18nLanguages[language] = {};
					}
					if (i18nContext.selected === undefined) {
						i18nContext.selected = language;
					}
				});
			}
		},

		/* Be careful. If language is not setted as available then it fails silently */
		add: function(language, context) {
			if (_.isAvailable(language)){
				var languageItems = i18nLanguages[language];
				Object.keys(context).forEach(function(key){
					languageItems[key] = context[key];
				});
			}
		}
	};

	dust.helpers.i18n = function(chunk, context, bodies, params){
		var selected = i18nContext.selected,
			languageItems = i18nLanguages[selected],
			data = languageItems[params.key];

		return chunk.write(data);
	};

	/* We are writing to the `dust` object so we don't need to return anything */
})(typeof exports === 'object' ? require('dustjs-linkedin') : dust);
