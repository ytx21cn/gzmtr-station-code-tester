"use strict";

const Private = new (function () {
	const getPrivateLiteral = "_getPrivate";
	
	this.initPrivate = function (obj, privateKey, data) {
		Object.defineProperty(obj, getPrivateLiteral, { // shall be not enumerable
			value: function (key) {
				if (key === privateKey) {
					return data;
				}
				else {
					throw new Error("Private data access is denied. ");
				}
			}
		})
	};
	
	this.createPrivateGetter = function (privateKey) {
		return function getPrivate(obj) {
			if (!Object.prototype.hasOwnProperty.call(obj, getPrivateLiteral)) { // if obj does not have the designated method
				throw new Error(`${getPrivateLiteral} is not found on this object`);
			}
			return (obj[getPrivateLiteral])(privateKey);
		};
	};
	
	Object.freeze(this);
})();

export { Private };