import fs from "fs";
import path from "node:path";

const consumerUrl = "https://data.cityofnewyork.us/resource/nre2-6m2s.json";
const consumerResponse = await fetch(consumerUrl);
const consumerValues = await consumerResponse.json();

console.log(`Fetched ${consumerValues.length} consumer values.`);

const dataDir = path.join("src", "lib", "data");
fs.mkdirSync(dataDir, { recursive: true });

const outputPath = path.join(dataDir, "consumer-values.json");
fs.writeFileSync(outputPath, JSON.stringify(consumerValues, null, 2));
console.log(`Saved to ${outputPath}`);