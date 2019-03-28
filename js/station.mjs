"use strict";

function Station(code, cnName, enName) {
	this.code = code.toUpperCase();
	this.cnName = cnName;
	this.enName = enName;
	
	Object.freeze(this);
}

Station.prototype.print = function () {
	console.log(`[${this.code}] ${this.cnName} ${this.enName}`);
}

Station.checkConflict = function (station1, station2) {
	if (!(Object.getPrototypeOf(station1) === Station.prototype && Object.getPrototypeOf(station2) === Station.prototype)) { // if either one of them is not a legal argument
		throw new TypeError("Illegal argument types: at least one of station1 and station2 is not of type Station");
	}
		
		const hasConflict = ((station1.code === station2.code) && (station1.cnName !== station2.cnName || station1.enName !== station2.enName)) // two different stations have the same station code
			|| ((station1.code !== station2.code) && (station1.cnName === station2.cnName || station1.enName === station2.enName)); // OR: a station has two different station codes
		
		if (hasConflict) {
			console.log("!!! CONFLICT FOUND !!!");
			station1.print();
			station2.print();
		}
		
}

export { Station };