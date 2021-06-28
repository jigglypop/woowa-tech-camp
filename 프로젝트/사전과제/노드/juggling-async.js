const http = require("http");

const urls = process.argv.slice(2);
const results = [];

for (i = 0; i < urls.length; i++) {
  results[i] = null;
}

for (i = 0; i < urls.length; i++) {
  (function (i) {
    http.get(urls[i], function (req) {
      let result = "";
      req.setEncoding("utf8");
      req.on("data", function (data) {
        result += data;
      });
      req.on("end", function () {
        results[i] = result;
        let count = 0;
        for (let result of results) {
          if (result != null) count++;
        }
        if (count == results.length) {
          for (let result of results) {
            console.log(result);
          }
        }
      });
    });
  })(i);
}

// 'use strict'
// const http = require('http')
// const bl = require('bl')
// const results = []
// let count = 0

// function printResults () {
//   for (let i = 0; i < 3; i++) {
//     console.log(results[i])
//   }
// }

// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err) {
//         return console.error(err)
//       }

//       results[index] = data.toString()
//       count++

//       if (count === 3) {
//         printResults()
//       }
//     }))
//   })
// }

// for (let i = 0; i < 3; i++) {
//   httpGet(i)
// }
