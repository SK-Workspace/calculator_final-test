/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/core/Locale",
	'sap/base/util/isPlainObject',
	"sap/base/Log"
], function (Locale,
			 isPlainObject,
			 Log) {
	"use strict";

	/**
	 * Utility class helping with JSON strings and formatters.
	 *
	 * @author SAP SE
	 * @version 1.96.2
	 *
	 * @private
	 * @alias sap.ui.integration.util.Utils
	 */
	var Utils = { };

	/**
	 * Check if given string is a JSON.
	 * @param {string} sText The text to be tested.
	 * @returns {boolean} Whether the string is in a JSON format or not.
	 */
	Utils.isJson = function (sText) {
		if (typeof sText !== "string") {
			return false;
		}
		try {
			JSON.parse(sText);
			return true;
		} catch (error) {
			return false;
		}
	};


	/**
	 * Shifts formatter options and locale.
	 * @param {object} formatOptions The format options.
	 * @param {string} locale Custom locale
	 * @returns {object} Locale
	 */
	Utils.processFormatArguments = function (formatOptions, locale) {

		var oFormatOptions = isPlainObject(formatOptions) ? formatOptions : {},
			oLocale = typeof formatOptions === "string" ? new Locale(formatOptions) : (locale && new Locale(locale));

		return {
			formatOptions: oFormatOptions,
			locale: oLocale
		};
	};

	/**
	 * Parses the JSON Date representation into a Date object.
	 * @param {string|number|object} vDate Any string and number from which Date object can be created, or a Date object.
	 * @returns {object} A Date object if the vDate matches one else the vDate itself
	 */

	var JSON_DATE_TICKS = 1,
		JSON_DATE_SIGN = 2,
		JSON_DATE_MINUTES = 3;

	Utils.parseJsonDateTime = function (vDate) {
		var rJSONDateFormat = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/,
			aJSONDateParts;
		if (typeof vDate === "string") {
			aJSONDateParts = rJSONDateFormat.exec(vDate);
		}

		if (aJSONDateParts) {
			// 0 - complete results; 1 - ticks; 2 - sign; 3 - minutes
			var oResult = new Date(parseInt(aJSONDateParts[JSON_DATE_TICKS]));
			if (aJSONDateParts[JSON_DATE_SIGN]) {
				var iMins = parseInt(aJSONDateParts[JSON_DATE_MINUTES]);
				if (aJSONDateParts[JSON_DATE_SIGN] === "-") {
					iMins = -iMins;
				}

				// The offset is reversed to get back the UTC date, which is
				// what the API will eventually have.
				var iCurrentMinutes = oResult.getUTCMinutes();
				oResult.setUTCMinutes(iCurrentMinutes - iMins);

			}
			if (isNaN(oResult.valueOf())) {
				Log.error("Invalid JSON Date format - " + vDate);
			} else {
				vDate = oResult;
			}
		}

		return vDate;
	};

	/**
	 * @const {int} The default timeout before a promise is rejected when Utils.timeoutPromise is used.
	 */
	Utils.DEFAULT_PROMISE_TIMEOUT = 5000;

	/**
	 * If the given promise does not resolve before the timeout, the promise is rejected and an error is logged.
	 * @param {Promise} pOriginalPromise The promise which will be encapsulated in a timeout.
	 * @param {int} [iTimeout=Utils.DEFAULT_PROMISE_TIMEOUT] The time in ms before timeout.
	 * @returns {Promise} Resolves or rejects when the given promise resolves or rejects. Additionally, if the timeout is reached - the promise is rejected.
	 */
	Utils.timeoutPromise = function (pOriginalPromise, iTimeout) {
		var pTimeoutPromise;

		if (iTimeout === undefined) {
			iTimeout = Utils.DEFAULT_PROMISE_TIMEOUT;
		}

		pTimeoutPromise = new Promise(function (resolve, reject) {
			setTimeout(function () {
				reject("The promise was not resolved after " + iTimeout + " ms so it timed out.");
			}, iTimeout);
		});

		return Promise.race([pOriginalPromise, pTimeoutPromise]);
	};

	Utils.hasFalsyValueAsString = function (sString) {
		return typeof sString == "string" && ["null", "false", "undefined", ""].indexOf(sString.trim()) > -1;
	};

	return Utils;
});