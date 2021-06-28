const http = require("http");
const url = require("url");

const routes = {
  "/api/parsetime": function (URL) {
    not = new Date(URL.query.iso);
    return {
      hour: not.getHours(),
      minute: not.getMinutes(),
      second: not.getSeconds(),
    };
  },
  "/api/unixtime": function (URL) {
    return { unixtime: new Date(URL.query.iso).getTime() };
  },
};

const server = http.createServer(function (req, res) {
  let URL = url.parse(req.url, true);
  let data = routes[URL.pathname];
  if (data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data(URL)));
  } else {
    res.writeHead(404);
    res.end();
  }
});
server.listen(process.argv[2]);

// 'use strict'
// const http = require('http')

// function parsetime (time) {
//   return {
//     hour: time.getHours(),
//     minute: time.getMinutes(),
//     second: time.getSeconds()
//   }
// }

// function unixtime (time) {
//   return { unixtime: time.getTime() }
// }

// const server = http.createServer(function (req, res) {
//   const parsedUrl = new URL(req.url, 'http://example.com')
//   const time = new Date(parsedUrl.searchParams.get('iso'))
//   let result

//   if (/^\/api\/parsetime/.test(req.url)) {
//     result = parsetime(time)
//   } else if (/^\/api\/unixtime/.test(req.url)) {
//     result = unixtime(time)
//   }

//   if (result) {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(result))
//   } else {
//     res.writeHead(404)
//     res.end()
//   }
// })
// server.listen(Number(process.argv[2]))
