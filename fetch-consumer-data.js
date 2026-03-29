import fs from "fs";
import path from "node:path";

const consumerUrl = "https://data.cityofnewyork.us/resource/nre2-6m2s.json";
const consumerResponse = await fetch(consumerUrl);
const consumerValues = await consumerResponse.json();

console.log(`Fetched ${consumerValues.length} consumer values.`);

function isBlankValue(value) {
	if (value === null || value === undefined) return true;
	if (typeof value === "string") return value.trim() === "";
	return false;
}

function isBlankEntry(entry) {
	if (!entry || typeof entry !== "object") return true;
	const values = Object.values(entry);
	if (values.length === 0) return true;
	return values.every((value) => isBlankValue(value));
}

const filteredConsumerValues = consumerValues.filter((entry) => {
	if (isBlankEntry(entry)) return false;
	if (isBlankValue(entry.business_name)) return false;
	if (isBlankValue(entry.complaint_code)) return false;
	return true;
});

console.log(
	`Retained ${filteredConsumerValues.length} records after removing blank entries and records missing business_name or complaint_code.`
);

const dataDir = path.join("src", "lib", "data");
fs.mkdirSync(dataDir, { recursive: true });

const outputPath = path.join(dataDir, "consumer-values.json");
fs.writeFileSync(outputPath, JSON.stringify(filteredConsumerValues, null, 2));
console.log(`Saved to ${outputPath}`);