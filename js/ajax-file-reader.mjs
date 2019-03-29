"use strict";

import { plainTextMimeType } from "./mime.mjs";

const AjaxFileReader = (function () {
	
	const AjaxFileReader = function () {
		Object.freeze(this);
	};
	
	/* Source consulted for this part:
		XMLHttpRequest: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
		Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
	*/
	function resolve(filePath, mimeType = plainTextMimeType) {
		return new Promise(function (resolve) {
			const xhr = new XMLHttpRequest();
			xhr.overrideMimeType(mimeType);
			xhr.onload = function () {
				resolve(xhr.responseText);
			};
			xhr.onerror = function () {
				console.log(xhr.status);
			};
			xhr.open("GET", filePath);
			xhr.send();
		});
	};
	
	AjaxFileReader.prototype.readFile = async function (filePath, mimeType = plainTextMimeType) {
		let text = await resolve(filePath, mimeType);
		return Promise.resolve(text);
	};
	
	return AjaxFileReader;
	
})();

export { AjaxFileReader };