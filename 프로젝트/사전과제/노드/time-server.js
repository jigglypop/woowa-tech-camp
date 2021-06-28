const net = require("net");
const zero = (n) => {
  return ("0" + n).slice(-2);
};
const server = net.createServer((socket) => {
  now = new Date();
  string =
    now.getFullYear() +
    "-" +
    zero(now.getMonth() + 1) +
    "-" +
    zero(now.getDate()) +
    " " +
    zero(now.getHours()) +
    ":" +
    zero(now.getMinutes()) +
    "\n";
  socket.end(string);
});
server.listen(process.argv[2]);
