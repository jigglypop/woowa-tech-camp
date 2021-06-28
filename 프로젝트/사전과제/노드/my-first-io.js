const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename);
console.log((file.toString().match(/\n/g) || []).length);

// ("use strict");
// const fs = require("fs");

// const contents = fs.readFileSync(process.argv[2]);
// const lines = contents.toString().split("\n").length - 1;
// console.log(lines);
