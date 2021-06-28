const http = require("http");
const bl = require("bl");

const url = process.argv[2];

http.get(url, (req) => {
  req.setEncoding("utf-8");
  let res = "";
  req.on("data", (data) => {
    res += data;
  });
  req.on("end", () => {
    console.log(res.length);
    console.log(res);
  });
});

// 'use strict'
// const http = require('http')
// const bl = require('bl')

// http.get(process.argv[2], function (response) {
//   response.pipe(bl(function (err, data) {
//     if (err) {
//       return console.error(err)
//     }
//     data = data.toString()
//     console.log(data.length)
//     console.log(data)
//   }))
// })
