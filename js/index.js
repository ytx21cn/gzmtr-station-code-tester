"use strict";

import { tsvMimeType } from "./mime.mjs";
import { AjaxFileReader } from "./ajax-file-reader.mjs";
import { StationCodeMap } from "./station-code-map.mjs";

const dataPath = "./data/GZMTR 3-letter station codes.tsv"; // relative to the path of index.html
const displayArea = document.getElementById("js-code-display-area");

const fileReader = new AjaxFileReader();

function checkConflictingEntries(codes) {
	if (!(typeof codes === "string")) {
		throw new TypeError("Error: argument \"codes\" must be a string");
	}
	
	const stationCodeMap = new StationCodeMap();
	stationCodeMap.checkCodes(codes, "\n", "\t");
}

async function process() {
	const text = await fileReader.readFile(dataPath, tsvMimeType);
	displayArea.innerHTML = text;
	checkConflictingEntries(text);
};

process();