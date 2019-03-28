"use strict";

import { tsvMimeType } from "./mime.mjs";
import { AjaxFileReader } from "./ajax-file-reader.mjs";
import { Station } from "./station.mjs";

const dataPath = "./data/GZMTR 3-letter station codes.tsv"; // relative to the path of index.html
const displayArea = document.getElementById("js-code-display-area");

const fileReader = new AjaxFileReader();

function checkConflictingEntries(codes) {
	if (!(typeof codes === "string")) {
		throw new TypeError("Error: argument \"codes\" must be a string");
	}
	
	const stationCodeMap = new Map();
	
	const arrayOfLines = codes.split("\n");
	

/*
const aI = new Station("a", "我", "I");
const aYou = new Station("a", "你", "You");
const bYou = new Station("b", "你", "You");
const cHe = new Station("c", "他", "He");

Station.checkConflict(aI, aI);
Station.checkConflict(aI, cHe);
Station.checkConflict(aI, aYou);
Station.checkConflict(aYou, bYou);
*/

}

async function process() {
	const text = await fileReader.readFile(dataPath, tsvMimeType);
	displayArea.innerHTML = text;
	checkConflictingEntries(text);
};
process();