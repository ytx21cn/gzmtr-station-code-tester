"use strict";

import { Private } from "./private.mjs";
import { Station } from "./station.mjs";

const StationCodeMap = (function () {
	
	const privateKey = {};
	
	const StationCodeMap = function () {
		const privateData = new (function () {
			this.codeToStationMap = new Map();
			this.cnNamesToCodeMap = new Map();
			this.enNamesToCodeMap = new Map();
			Object.freeze(this);
		})();
		Private.initPrivate(this, privateKey, privateData);
	};
	
	StationCodeMap.getPrivate = Private.createPrivateGetter(privateKey);
	
	StationCodeMap.prototype.checkCodes = function (codes, primarySeparator, secondarySeparator) {

		const privateData = StationCodeMap.getPrivate(this);
		
		Array.isEmptyStringArray = function(arr) {
			let result = true;
			for (let i of arr) {
				if (i !== "") {
					result = false;
					break;
				}
			}
			return result;
		};
		
		const arrayOfLines = codes.split(primarySeparator);
		arrayOfLines.forEach(function (line, index) {
			const entries = line.split(secondarySeparator);
			if (index !== 0 && (!Array.isEmptyStringArray(entries))) {
				const currentCode = entries[1];
				const currentCnName = entries[2];
				const currentEnName = entries[3];
				
				const newStation = new Station(currentCode, currentCnName, currentEnName);
				
				/*
					There are three maps to manipulate on:
						1. codeToStationMap
						2. cnNamesToCodeMap
						3. enNamesToCodeMap
						
					Procedure of checking conflicting entries:
						Example: Given new Station("XIL", "西塱", "Xilang")
						
						1. check if "XIL" exists in codeToStationMap
							1.1 if exists, check if the input entries "西塱" and "Xilang" are conflicting with existing entries in codeToStationMap; output a message and end the procedure
							1.2 if does not exist, proceed to step 2
						2. check if "西塱" exists in cnNamesToCodeMap, and if "Xilang" exists in enNamesToCodeMap
							2.1 if both of them do not exist, add the corresponding entries to all the three maps
							2.2 if exactly one of them do not exist, then there is a conflicting entry; output the message and end the procedure
							2.3 if both of them exist:
								2.3.1 if at least one of them are not matching existing entries, there is an error; output the message and end the procedure
								2.3.2 if both of them are matching existing entries, do nothing and end the procedure
				*/
				
				if (privateData.codeToStationMap.has(currentCode)) {
					const existingStation = privateData.codeToStationMap.get(currentCode);
					Station.checkConflict(newStation, existingStation);
				}
				else {
					const cnNameCode = privateData.cnNamesToCodeMap.get(currentCnName);
					const enNameCode = privateData.enNamesToCodeMap.get(currentEnName);
					
					if (cnNameCode === undefined && enNameCode === undefined) { // if both undefined, add new entries to all three maps
						privateData.codeToStationMap.set(currentCode, newStation);
						privateData.cnNamesToCodeMap.set(currentCnName, currentCode);
						privateData.enNamesToCodeMap.set(currentEnName, currentCode);
					}
					else if (cnNameCode !== currentCode || enNameCode !== currentCode) { // if exactly one of them  is undefined, or at least one of them do not match existing entries
						console.log("!!! CONFLICT FOUND !!!");
						console.log("Attempting to add: ");
						newStation.print();
						console.log("Existing entry: ");
						(new Station(cnNameCode, currentCnName, currentEnName)).print();
						(new Station(enNameCode, currentCnName, currentEnName)).print();
					}
					
				}
			}
		});
				
		console.log(privateData.codeToStationMap);
		console.log(privateData.cnNamesToCodeMap);
		console.log(privateData.enNamesToCodeMap);
	};
	
	return StationCodeMap;
})();

export { StationCodeMap };