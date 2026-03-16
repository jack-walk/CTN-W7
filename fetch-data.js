const url = "https://data.cityofnewyork.us/resource/tg4x-b46p.json?$where=eventtype='Shooting Permit'&$order=startdatetime DESC&$limit=25";

const response = await fetch(url);
const permits = await response.json();

console.log(permits[0]);
console.log(permits[0].subcategoryname);
console.log(permits[0].borough);

const subcategories = permits.map(permit => permit.subcategoryname);
console.log(subcategories);