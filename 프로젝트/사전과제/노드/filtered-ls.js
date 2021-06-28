const fs = require("fs");
const path = require("path");

fs.readdir(process.argv[2], function (err, datas) {
  if (err) throw err;
  for (let data of datas) {
    if (path.extname(data) === "." + process.argv[3]) {
      console.log(data);
    }
  }
});

// 'use strict'
// const fs = require('fs')
// const path = require('path')

// const folder = process.argv[2]
// const ext = '.' + process.argv[3]

// fs.readdir(folder, function (err, files) {
//   if (err) return console.error(err)
//   files.forEach(function (file) {
//     if (path.extname(file) === ext) {
//       console.log(file)
//     }
//   })
// })
