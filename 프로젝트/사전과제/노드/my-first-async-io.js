const fs = require("fs");
const filename = process.argv[2];
fs.readFile(filename, function read(err, data) {
  if (err) throw err;
  console.log(data.toString().split("\n").length - 1);
});

// 'use strict'
// const fs = require('fs')
// const file = process.argv[2]

// fs.readFile(file, function (err, contents) {
//   if (err) {
//     return console.log(err)
//   }
//   // fs.readFile(file, 'utf8', callback) can also be used
//   const lines = contents.toString().split('\n').length - 1
//   console.log(lines)
// })
